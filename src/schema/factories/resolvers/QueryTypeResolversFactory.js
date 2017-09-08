import { codeBlock } from 'common-tags'

export default class QueryTypeResolversFactory {
  constructor() {}

  createFromQueryTypes(queryTypes) {
    return this.createQueryTypeResolvers(queryTypes)
  }

  createQueryTypeResolvers(queryTypes) {
    return queryTypes.map((queryType) => {
      return {
        name: queryType.name,
        type: queryType.type,
        superType: queryType.superType,
        resolve: this.createResolverMethod(queryType.type, queryType.superType)
      }
    })
  }

  createResolverMethod(referenceType, referenceSuperType) {
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

}
