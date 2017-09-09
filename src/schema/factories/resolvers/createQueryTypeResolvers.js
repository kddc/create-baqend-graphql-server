import { codeBlock } from 'common-tags'

const createResolverMethod = (referenceType, referenceSuperType) => {
  let args = ['root', 'args', 'context']
  switch(referenceSuperType) {
    case "object":
    return codeBlock`
    (${args.join(', ')}) => {
      return resolveObjectQuery('${referenceType}', args, context)
    }`
    case "collection":
    return codeBlock`
    (${args.join(', ')}) => {
      return resolveCollectionQuery('${referenceType}', args, context)
    }`
  }
}

const createQueryTypeResolvers = (queryTypes) => {
  return queryTypes.map((queryType) => {
    return {
      name: queryType.name,
      type: queryType.type,
      superType: queryType.superType,
      resolve: createResolverMethod(queryType.type, queryType.superType)
    }
  })
}

export default createQueryTypeResolvers
