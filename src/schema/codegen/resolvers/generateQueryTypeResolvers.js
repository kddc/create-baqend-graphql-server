import { codeBlock } from 'common-tags'
import applyTemplate from '../templates/applyTemplate'

const generateQueryTypeResolvers = (queryTypeResolvers) => {
  return codeBlock`
  Query: {
    ${queryTypeResolvers.map((queryTypeResolver) => {
      return applyTemplate(queryTypeResolver.resolve[0], queryTypeResolver)
    }).join(',\n')}
  }`
}

export default generateQueryTypeResolvers
