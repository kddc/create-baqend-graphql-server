import FieldParser from './FieldParser'

export default class SchemaParser {
  static parseSchema(schemaString) {
    let schema = JSON.parse(schemaString)
    schema = schema.filter((type) => {
      const isAdministrative = !type.class.match(/(speedKit\.Asset|logs\.AppLog|logs\.AccessLog)/)
      const isEmpty = !!Object.keys(type.fields).length
      return isAdministrative && isEmpty
    })
    let types
    types = this.parseTypes(schema)
    types = types.map((type) => {
      const connections = this.getConnections(type.fields)
      return {
        ...type,
        connections,
      }
    })
    // console.log('--------------------------------------------------------------------')
    // console.log(types)
    return types
  }

  static removePrefix(input) {
    return input.replace(new RegExp('\\/db\\/', 'i'), '')
  }

  static getTypes(schema) {
    const types = {
      reference: [],
      embedded: [],
    }
    schema.forEach((type) => {
      if (type.embedded) {
        types.embedded.push(this.removePrefix(type.class))
      } else {
        types.reference.push(this.removePrefix(type.class))
      }
    })
    return types
  }

  static parseTypes(schema) {
    const types = this.getTypes(schema)
    const fieldParser = new FieldParser(types)
    const parsedSchema = schema.map(type => ({
      name: this.removePrefix(type.class),
      abstract: !(type.superClass || type.embedded) || false,
      parent: (type.superClass && this.removePrefix(type.superClass)) || null,
      embedded: type.embedded || false,
      parentFields: [],
      fields: Object.keys(type.fields).map(key => fieldParser.parseField({
        name: type.fields[key].name,
        type: this.removePrefix(type.fields[key].type),
        flags: type.fields[key].flags,
      })),
    }))
    const parsedSchemaWithParentFields = parsedSchema.map((type) => {
      if (type.parent) {
        const parentType = parsedSchema.filter(parentClass => parentClass.name === type.parent)[0]
        return {
          ...type,
          parentFields: parentType.fields,
        }
      }
      return type
    })
    return parsedSchemaWithParentFields
  }

  static getConnections(fields) {
    return fields.map((field) => {
      if (field.fieldType === 'collection') {
        const { collectionType, types } = field.elementType
        return {
          name: field.name,
          collectionType,
          types,
        }
      }
      return null
    }).filter(n => n)
  }
}
