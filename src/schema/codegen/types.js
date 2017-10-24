import { codeBlock } from 'common-tags'

const generateTypes = (opts, args) => {
  const { defs, queryDefs, mutationDefs } = args
  return codeBlock`
    let typeDefs = \`
      ${defs.join('\n')}
      extend type Query {
        ${queryDefs.join('\n')}
      }
      type Mutation {
        ${mutationDefs.join('\n')}
      }
    \`
    export default typeDefs
  `
}

export {
  generateTypes,
}
