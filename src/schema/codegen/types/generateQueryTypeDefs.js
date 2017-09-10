import { codeBlock } from 'common-tags'
import applyTemplate from '../templates/applyTemplate'

const generateQueryTypeDefs = (queryTypes) => {
  return codeBlock`
  type Query {
    ${queryTypes.map((type) => {
      return applyTemplate('queryType', type)
    }).join('\n')}
  }
  `
}

export default generateQueryTypeDefs
