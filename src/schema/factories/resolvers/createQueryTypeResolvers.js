import { codeBlock } from 'common-tags'

const createResolveArgs = (referenceType, referenceSuperType) => {
  let callerArgs = ['root', 'args', 'context']
  let resolverArgs = [`'${referenceType}'`, 'args', 'context']
  switch(referenceSuperType) {
    case "object":
      return ['resolveObjectQuery', callerArgs, resolverArgs]
    case "collection":
      return ['resolveCollectionQuery', callerArgs, resolverArgs]
  }
}

const createQueryTypeResolvers = (queryTypes) => {
  return queryTypes.map((queryType) => {
    return {
      name: queryType.name,
      type: queryType.type,
      superType: queryType.superType,
      resolve: createResolveArgs(queryType.type, queryType.superType)
    }
  })
}

export default createQueryTypeResolvers
