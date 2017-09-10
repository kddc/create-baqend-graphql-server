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

const createQueryTypes = (objectTypes) => {
  let queryTypes = []
  objectTypes.forEach((objectType) => {
    queryTypeTemplates.forEach((queryTypeTemplate) => {
      queryTypes.push({
        name: queryTypeTemplate.createName(objectType.name),
        args: queryTypeTemplate.args,
        type: objectType.name,
        superType: queryTypeTemplate.superType
      })
    })
  })
  return queryTypes
}

export default createQueryTypes
export {
  queryTypeTemplates
}
