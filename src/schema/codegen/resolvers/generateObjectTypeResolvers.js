import { codeBlock } from 'common-tags'
import applyTemplate from '../templates/applyTemplate'

const generateObjectTypeResolvers = (typeResolvers) => {
  return codeBlock`
  ${typeResolvers.map((typeResolver) => {
    return codeBlock`
    ${typeResolver.name}: {
      ${typeResolver.resolvers.map((fieldResolver) =>  {
        return applyTemplate(fieldResolver.resolve[0], fieldResolver)
      }).join(',\n')}
    }
    `
  }).join(',\n')}
  `
}

export default generateObjectTypeResolvers
