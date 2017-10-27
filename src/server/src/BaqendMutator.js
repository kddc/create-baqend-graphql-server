/* eslint-disable no-unused-vars, class-methods-use-this */
class BaqendMutator {
  constructor({ db }) {
    this.db = db
  }

  // Single Objects
  createEntity(type, { input }, context) {
    const { clientMutationId } = input
    const json = this.transformInput({ type }, input)
    const fields = Object.keys(json)
    const entity = new this.db[type]()
    const fieldValues = this.resolveFieldValues(type, fields, json, context)
    return Promise.all(fieldValues).then((resolvedFieldValues) => {
      fields.forEach((field, index) => {
        entity[field] = resolvedFieldValues[index]
      })
      return entity.insert().then(entityInserted => ({
        clientMutationId,
        ...entityInserted.toJSON(),
      }))
    })
  }

  updateEntity(type, { input }, context) {
    const { clientMutationId, id, ...updates } = input
    const json = this.transformInput({ type }, updates)
    const fields = Object.keys(json)
    const entity = this.db[type].load(id)
    const fieldValues = this.resolveFieldValues(type, fields, json, context)
    return Promise.all([entity, fieldValues]).then((res) => {
      const [resolvedEntity, resolvedFieldValues] = res
      fields.forEach((field, index) => {
        resolvedEntity[field] = resolvedFieldValues[index]
      })
      return resolvedEntity.update().then(entityUpdated => ({
        clientMutationId,
        ...entityUpdated.toJSON(),
      }))
    })
  }

  deleteEntity(type, { input }, context) {
    const { clientMutationId, id } = input
    return this.db[type].load(id).then(entity => entity.delete().then(() => ({
      clientMutationId,
      id,
    })))
  }

  resolveFieldValues(type, fields, json, context) {
    const referenceTypes = this.getReferenceTypes(type)
    const resolvedValues = []
    fields.forEach((field) => {
      let value
      if (referenceTypes[field] && referenceTypes[field].elementType.reference) {
        const { collectionType, elementType } = referenceTypes[field]
        if (collectionType) {
          value = this.resolveCollectionField(collectionType, elementType.type, json[field])
        } else {
          value = this.resolveReferenceField(elementType.type, json[field])
        }
      } else {
        value = json[field]
      }
      resolvedValues.push(value)
    })
    return Promise.all(resolvedValues).then((values) => {
      if (fields.length !== values.length) {
        throw new Error('Something went wrong while creating some references')
      }
      return values
    })
  }

  resolveReferenceField(type, value) {
    if (typeof value === 'string') {
      const ref = this.db.getReference(value)
      return new Promise((res, rej) => res(ref))
    }
    const depth = this.getDepth(value)
    const entity = this.db[type].fromJSON(value)
    return entity.save({ depth })
  }

  resolveCollectionField(collectionType, type, value) {
    if (collectionType === 'Map') {
      return this.resolveMapField(type, value)
    }
    return this.resolveListOrSetField(type, value)
  }

  resolveListOrSetField(type, entries) {
    return Promise.all(entries.map(entry => this.resolveReferenceField(type, entry)))
  }

  resolveMapField(type, entries) {
    const entryValues = Object.keys(entries).map(key => entries[key])
    const entryValuesPromises = entryValues.map(entryValue => this.resolveReferenceField(type, entryValue))
    return Promise.all(entryValuesPromises).then((values) => {
      const obj = new this.db.Map()
      Object.keys(entries).forEach((key, index) => {
        obj.set(key, values[index])
      })
      return obj
    })
  }

  addEntryToCollection(type, field, { input }, context) {
    let element
    const { clientMutationId, id } = input
    const { collectionType, elementType } = this.getReferenceTypes(type)[field]
    const entity = this.db[type].load(id)
    const { entry } = this.transformInputObject({ elementType }, 'entry', input)
    if (elementType.reference) {
      element = (collectionType === 'Map' && entry.value) || entry
      element = this.resolveReferenceField(elementType.type, element).then(res => res.id)
    } else {
      element = (collectionType === 'Map' && entry.value) || entry
    }
    return Promise.all([entity, element]).then((resolved) => {
      const [resolvedEntity, resolvedElement] = resolved
      let partialUpdateOperation
      switch (collectionType) {
        case 'Map':
          partialUpdateOperation = resolvedEntity.partialUpdate().put(field, entry.key, resolvedElement)
          break
        case 'Set':
          partialUpdateOperation = resolvedEntity.partialUpdate().add(field, resolvedElement)
          break
        default:
          partialUpdateOperation = resolvedEntity.partialUpdate().push(field, resolvedElement)
          break
      }
      return partialUpdateOperation.execute().then(res => ({
        clientMutationId,
        ...res.toJSON(),
      }))
    })
  }

  removeEntryFromCollection(type, field, { input }, context) {
    const { clientMutationId, id } = input
    const { collectionType } = this.getReferenceTypes(type)[field]
    const { entry } = this.getFieldInputArguments('entry', input)
    const element = (entry.key || entry.element) ? (entry.key || entry.element) : entry
    return this.db[type].load(id).then((object) => {
      console.log(element)
      const partialUpdateOperation = object.partialUpdate().remove(field, element).execute()
      return partialUpdateOperation.then(res => ({
        clientMutationId,
        ...res.toJSON(),
      }))
    })
  }

  /**
   * Traverses the mutation input
   *
   * @param {Object} fieldType - Baqend fieldType
   * @param {Object} input - JSON input object from GraphQL query
   *
   * @returns {Object} json - transformed input
   */
  transformInput({ type, basic }, input) {
    let json = input
    if (!basic && json) {
      const referenceTypes = this.getReferenceTypes(type)
      Object.keys(referenceTypes).forEach((key) => {
        json = this.transformInputObject(referenceTypes[key], key, json)
      })
    }
    return json
  }

  /**
   * Transforms the mutation input to a format the Baqend sdk understands
   * Transforms {fieldname}Id(s) to {fieldname}
   * Transforms map [{ key, value }] format to { key: value } format
   *
   * @param {Object} fieldType - Baqend fieldType
   * @param {Object} input - JSON input object from GraphQL query
   * @returns {Object} json - transformed input
   */
  transformInputObject(referenceType, key, input) {
    let json = input
    json = this.getFieldInputArguments(key, json)
    if (json[key]) {
      json[key] = this.parseInputObject(referenceType, json[key])
    }
    return json
  }

  /**
   * Maps the id field to field with the regarding key
   *
   * @param {String} key - field name
   * @param {Object} input - JSON input object for a single field
   * @returns {Object} json - transformed input
   */
  getFieldInputArguments(key, input) {
    const json = input
    if (json) {
      if (json[`${key}Id`]) {
        json[key] = json[`${key}Id`]
        delete json[`${key}Id`]
      } else if (json[`${key}Ids`]) {
        json[key] = json[`${key}Ids`]
        delete json[`${key}Ids`]
      }
    }
    return json
  }

  parseInputObject({ collectionType, elementType }, input) {
    const json = input
    if (collectionType) {
      if (collectionType === 'Map') {
        const obj = {}
        json.forEach(({ key, value }) => {
          obj[key] = this.transformInput(elementType, value)
        })
        return obj
      }
      return json.map(entry => this.transformInput(elementType, entry))
    }
    if (json && json.key && json.value) {
      return {
        key: json.key,
        value: this.transformInput(elementType, json.value),
      }
    }
    return this.transformInput(elementType, json)
  }

  /**
   * Returns an object with all possible reference types for a baqend class
   *
   * @param {String} Baqend Class
   * @returns {Object} referenceTypes
   */
  /* eslint-disable dot-notation */
  getReferenceTypes(type) {
    const collectionTypes = { 1: 'List', 2: 'Map', 3: 'Set' }
    const referenceTypes = {}
    this.db[type]()['_metadata'].type.declaredAttributes.forEach((attribute) => {
      if (attribute.type && (attribute.type.isEntity || attribute.type.isEmbeddable)) {
        referenceTypes[attribute.name] = {
          elementType: {
            type: attribute.type.name,
            basic: attribute.type.isBasic,
            reference: attribute.type.isEntity,
          },
        }
      } else if (attribute.isCollection) {
        referenceTypes[attribute.name] = {
          collectionType: collectionTypes[attribute.collectionType],
          elementType: {
            type: attribute.elementType.name,
            basic: attribute.elementType.isBasic,
            reference: attribute.elementType.isEntity,
          },
        }
      }
    })
    return referenceTypes
  }

  /**
   * Gets the depth of an object for depth saving a json
   *
   * @param {Object} json object that should be saved
   * @returns {Number} depth of the json
   */
  getDepth(obj, level = 0) {
    let newLevel = level
    if (typeof obj === 'object') {
      // var inc = Array.isArray(obj) ? 0 : 1
      Object.keys(obj).map(key => obj[key]).forEach((d) => {
        const depth = this.getDepth(d) + 1
        newLevel = Math.max(depth, level)
      })
    }
    return newLevel
  }
}

export default BaqendMutator
