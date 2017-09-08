import { codeBlock } from 'common-tags'

export default class TypeResolversGenerator {

  generateTypeResolvers(typeResolvers) {
    return codeBlock`
    ${typeResolvers.map((typeResolver) => {
      return codeBlock`
        ${typeResolver.name}: {
          ${typeResolver.resolvers.map((fieldResolver) =>  {
            return codeBlock`
              ${fieldResolver.name}: ${fieldResolver.resolve}
            `
          }).join(',\n')}
        }
      `
    }).join(',\n')}
    `
  }

}
