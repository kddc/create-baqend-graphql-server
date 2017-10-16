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
    const resolvedValues = this.resolveValues(type, fields, json, context)
    return Promise.all([entity, Promise.all(resolvedValues)]).then(([ entity, resolvedValues ]) => {
      if(fields.length !== resolvedValues.length) {
        throw 'Something went wrong while creating some references'
      }
      fields.forEach((field, index) => {
        entity[field] = resolvedValues[index]
      })
      return entity.insert().then(res => {
        res = res.toJSON()
        return {
          clientMutationId,
          ...res
        }
      })
    })
  }

  updateEntity(type, { input }, context) {
    const { clientMutationId, id } = input
    delete input['id']
    delete input['clientMutationId']
    const json = this.transformInput({ type }, input)
    const fields = Object.keys(json)
    const entity = this.db[type].load(id)
    const resolvedValues = this.resolveValues(type, fields, json, context)
    return Promise.all([entity, Promise.all(resolvedValues)]).then(([ entity, resolvedValues ]) => {
      if(fields.length !== resolvedValues.length) {
        throw 'Something went wrong while creating some references'
      }
      fields.forEach((field, index) => {
        entity[field] = resolvedValues[index]
      })
      return entity.update().then(res => {
        res = res.toJSON()
        return {
          clientMutationId,
          ...res
        }
      })
    })
  }

  deleteEntity(type, { input }, context) {
    const { clientMutationId, id } = input
    return this.db[type].load(id).then(res => {
      return res.delete().then(res => {
        return {
          clientMutationId,
          id
        }
      })
    })
  }

  resolveValues(type, fields, json, context) {
    const referenceTypes = this.getReferenceTypes(type)
    let resolvedValues = []
    fields.forEach((field) => {
      let value
      if (referenceTypes[field] && !referenceTypes[field].elementType.basic) {
        const elementType = referenceTypes[field].elementType.type
        if (referenceTypes[field].collectionType) {
          let values
          if(referenceTypes[field].collectionType === 'Map') {
            values = Object.values(json[field])
          } else {
            values = json[field]
          }
          values = values.map(entry => {
            if(typeof entry === 'string') {
              return this.db.getReference(entry)
            } else {
              const depth = this.getDepth(entry)
              const entity = this.db[elementType].fromJSON(entry)
              return entity.save({ depth })
            }
          })
          if(referenceTypes[field].collectionType === 'Map') {
            value = Promise.all(values).then(values => {
              let obj = new this.db.Map()
              Object.keys(json[field]).forEach((key, index) => {
                obj.set(key, values[index])
              })
              return obj
            })
          } else {
            value = Promise.all(values)
          }
        } else {
          if(typeof json[field] === 'string') {
            value = this.db.getReference(json[field])
          } else {
            const depth = this.getDepth(json[field])
            const entity = this.db[elementType].fromJSON(json[field])
            value = entity.save({ depth })
          }
        }
      } else {
        value = json[field]
      }
      resolvedValues.push(value)
    })
    return resolvedValues
  }

  addEntryToCollection(type, field, { input }, context) {
    const { clientMutationId, id } = input
    const referenceTypes = this.getReferenceTypes(type)
    const collectionType = referenceTypes[field].collectionType
    const elementType = referenceTypes[field].elementType
    const entry = this.getCollectionMutationInput(collectionType, field, input)
    let object = this.db[type].load(id)
    let element
    if (!elementType.basic && !entry.reference) {
      element = this.transformInput({ type: elementType.type }, entry.element)
      element = this.db[elementType.type].fromJSON(element)
      element = element.save().then(res => res.id)
    } else {
      element = entry.element
    }
    return Promise.all([ object, element ]).then(([object, element]) => {
      let partialUpdateOperation
      switch(collectionType) {
        case 'Map':
          partialUpdateOperation = object.partialUpdate().put(field, entry.key, element)
          break
        case 'Set':
          partialUpdateOperation = object.partialUpdate().add(field, element)
          break
        case 'List':
          partialUpdateOperation = object.partialUpdate().push(field, element)
          break
      }
      return partialUpdateOperation.execute().then(res => {
        res = res.toJSON()
        return {
          clientMutationId,
          ...res
        }
      })
    })
  }

  removeEntryFromCollection(type, field, { input }, context) {
    const { clientMutationId, id } = input
    const referenceTypes = this.getReferenceTypes(type)
    const collectionType = referenceTypes[field].collectionType
    const entry = this.getCollectionMutationInput(collectionType, field, input)
    if(entry.key || entry.element) {
      let element = entry.key || entry.element
      return this.db[type].load(id).then(object => {
        return object.partialUpdate().remove(field, element).execute().then(res => {
          res = res.toJSON()
          return {
            clientMutationId,
            ...res
          }
        })
      })
    }
  }

  transformInput({ type, basic }, json) {
    let depths = [ 0 ]
    if(!basic) {
      let referenceTypes = this.getReferenceTypes(type)
      Object.keys(referenceTypes).map((key) => {
        if(json[`${key}Id`] || json[`${key}Ids`]) {
          if (json[`${key}Id`]) {
            json[key] = json[`${key}Id`]
            delete json[`${key}Id`]
          } else if (json[`${key}Ids`] && Array.isArray(json[`${key}Ids`])) {
            json[key] = json[`${key}Ids`]
            delete json[`${key}Ids`]
          }
        }
        if (json[key]) {
          const { collectionType, keyType, elementType } = referenceTypes[key]
          if (collectionType) {
            if (collectionType == 'Map') {
              let obj = {}
              json[key].map(({ key, value }) => {
                obj[key] = this.transformInput(elementType, value)
              })
              json[key] = obj
            } else {
              json[key] = json[key].map(entry => this.transformInput(elementType, entry))
            }
          } else {
            json[key] = this.transformInput(elementType, json[key], true)
          }
        }
      })
    }
    return json
  }

  getCollectionMutationInput(collectionType, field, input) {
    let reference = false
    if(input[`${field}EntryIds`]) {
      reference = true
      input = input[`${field}EntryIds`]
    } else if(input[`${field}EntryId`]) {
      reference = true
      input = input[`${field}EntryId`]
    } else {
      input = input[`${field}Entry`]
    }
    return {
      reference: reference,
      key: collectionType == 'Map' && input['key'],
      element: collectionType == 'Map' && input['value'] || input,
    }
  }

  getReferenceTypes(type) {
    let collectionTypes = { 1: 'List', 2: 'Map', 3: 'Set' }
    let referenceTypes = {}
    this.db[type]()['_metadata'].type.declaredAttributes.map(attribute => {
      if(attribute.type && (attribute.type.isEntity || attribute.type.isEmbeddable)) {
        referenceTypes[attribute.name] = {
          elementType: {
            type: attribute.type.name,
            basic: attribute.type.isBasic
          }
        }
      } else if (attribute.isCollection) {
        referenceTypes[attribute.name] = {
          collectionType: collectionTypes[attribute.collectionType],
          keyType: attribute.keyType && {
            type: attribute.keyType.name,
            basic: attribute.keyType.isBasic
          },
          elementType: {
            type: attribute.elementType.name,
            basic: attribute.elementType.isBasic
          }
        }
      }
    })
    return referenceTypes
  }

  getDepth(obj, level = 0) {
    if (typeof obj == 'object') {
      // var inc = Array.isArray(obj) ? 0 : 1
      Object.values(obj).map((d) => {
        var depth = this.getDepth(d) + 1
        level = Math.max(depth, level);
      })
    }
    return level
  }

}

export default BaqendMutator
