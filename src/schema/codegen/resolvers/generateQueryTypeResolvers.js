import { codeBlock } from 'common-tags'
import applyTemplate from '../../templates/applyTemplate'

const generateQueryTypeResolvers = (queryTypeResolvers) => {
  return codeBlock`
  Query: {
    ${queryTypeResolvers.map((queryTypeResolver) => {
      return codeBlock `
      ${queryTypeResolver.name}:` + " " + applyTemplate(...queryTypeResolver.resolve)
    }).join(',\n')}
  }`
}

export default generateQueryTypeResolvers
