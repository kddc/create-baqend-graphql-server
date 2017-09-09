const queryTypeTemplates = [
  {
    createName: (type) => `${type}`,
    args: [],
    superType: "object"
  },
  {
    createName: (type) => `all${type}s`,
    args: [],
    superType: "collection"
  }
]

const createQueryTypes = (types) => {
  let queryTypes = []
  types.forEach((type) => {
    queryTypeTemplates.forEach((queryTypeTemplate) => {
      queryTypes.push({
        name: queryTypeTemplate.createName(type.name),
        args: queryTypeTemplate.args,
        type: type.name,
        superType: queryTypeTemplate.superType
      })
    })
  })
  return queryTypes
}

export default createQueryTypes
