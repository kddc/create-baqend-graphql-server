import { codeBlock } from 'common-tags'

const generateQueryTypeResolvers = (queryTypeResolvers) => {
  return codeBlock`
  Query: {
    ${queryTypeResolvers.map((queryTypeResolver) => {
      return codeBlock `
      ${queryTypeResolver.name}: ${queryTypeResolver.resolve}
      `
    }).join(',\n')}
  }`
}

export default generateQueryTypeResolvers
