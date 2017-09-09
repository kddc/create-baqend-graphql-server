import AttributeMapper from '../../mappers/AttributeMapper'

const createObjectTypes = (json) => {
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

export default createObjectTypes
