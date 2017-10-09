import { codeBlock } from 'common-tags'

const generateTypes = (opts, args) => {
  const { defs, queryDefs } = args
  return codeBlock`
    let typeDefs = \`
      ${defs.join('\n')}
      type Query {
        ${queryDefs.join('\n')}
      }
    \`
    export default typeDefs
  `
}

export {
  generateTypes
}
