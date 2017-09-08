import { codeBlock } from 'common-tags'

export default class QueryTypeResolversGenerator {

  generateQueryTypeResolvers(queryTypeResolvers) {
    return codeBlock`
    Query: {
      ${queryTypeResolvers.map((queryTypeResolver) => {
        return codeBlock `
          ${queryTypeResolver.name}: ${queryTypeResolver.resolve}
        `
      }).join(',\n')}
    }`
  }

}
