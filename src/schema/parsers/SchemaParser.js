import FieldParser from './FieldParser2'

export default class SchemaParser {

  static parseSchema(schemaString) {
    const schema = JSON.parse(schemaString)
    let types
    types = this.parseTypes(schema)
    types = types.map(type => {
      const connections = this.getConnections(type.fields)
      return {
        ...type,
        connections
      }
    })
    return types
  }

  static removePrefix(input) {
     return input.replace(new RegExp('\\/db\\/', 'i'), '')
  }

  static getTypes(schema) {
    let types = {
      reference: [],
      embedded: []
    }
    schema.map(type => {
      if(type['embedded']) {
        types['embedded'].push(this.removePrefix(type['class']))
      } else {
        types['reference'].push(this.removePrefix(type['class']))
      }
    })
    return types
  }

  static parseTypes(schema) {
    const types = this.getTypes(schema)
    const fieldParser = new FieldParser(types)
    schema = schema.map((type) => {
      return {
        "name": this.removePrefix(type['class']),
        "abstract": !(type['superClass'] || type['embedded']) || false,
        "parent": type['superClass'] && this.removePrefix(type['superClass']) || null,
        "embedded": type['embedded'] || false,
        "parentFields": [],
        "fields": Object.keys(type['fields']).map((key) => {
            return fieldParser.parseField({
              name: type['fields'][key]['name'],
              type: this.removePrefix(type['fields'][key]['type']),
              flags: type['fields'][key]['flags']
            })
        })
      }
    })
    schema = schema.map((type) => {
      if(type['parent']) {
        const parentType = schema.filter(parentType => parentType.name == type['parent'])[0]
        type['parentFields'] = parentType.fields
      }
      return type
    })
    return schema
  }

  static getConnections(fields) {
    return fields.map(field => {
      if(field.fieldType == 'collection') {
        const { collectionType, types } = field.elementType
        return {
          name: field.name,
          collectionType,
          types
        }
      }
      return null
    }).filter(n => n)
  }

}
