import FieldParser from '../../parsers/FieldParser'

const createObjectTypes = (json) => {
  return json.map((type) => {
    return {
      name: FieldParser.getType(type.class),
      fields: type.fields.map((field) => {
        return {
          name: field.name,
          ...FieldParser.parseType(field.type)
        }
      })
    }
  })
}

export default createObjectTypes
