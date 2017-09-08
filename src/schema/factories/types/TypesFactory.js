import AttributeMapper from '../../mappers/AttributeMapper'

export default class TypesFactory {
  constructor() {}

  createFromSchema(json) {
    return this.createObjectTypes(json)
  }

  createObjectTypes(json) {
    return json.map((type) => {
      return {
        name: AttributeMapper.getType(type.class),
        fields: type.fields.map((field) => {
          return {
            name: field.name,
            ...AttributeMapper.parseType(field.type)
          }
        })
      }
    })
  }

}
