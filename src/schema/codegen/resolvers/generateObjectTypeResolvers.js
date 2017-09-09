import { codeBlock } from 'common-tags'

const generateObjectTypeResolvers = (typeResolvers) => {
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

export default generateObjectTypeResolvers
