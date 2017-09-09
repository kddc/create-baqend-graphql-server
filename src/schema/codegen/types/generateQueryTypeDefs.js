import { codeBlock } from 'common-tags'

const generateQueryTypeDefs = (queryTypes) => {
  return codeBlock`
  type Query {
    ${queryTypes.map((type) => {
      return codeBlock`
      ${type.name}: ${type.superType === 'collection' ? '[' + type.type + ']' : type.type}
      `
    }).join('\n')}
  }
  `
}

export default generateQueryTypeDefs
