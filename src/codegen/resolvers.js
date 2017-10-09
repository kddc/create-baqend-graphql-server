import { codeBlock } from 'common-tags'

const generateResolvers = (opts, args) => {
  const { resolvers, queryResolvers } = args
  return codeBlock`
    let resolvers = {
      ${resolvers.join(',\n')},
      Query: {
        ${queryResolvers.join(',\n')}
      }
    }
    export default resolvers
  `
}

export {
  generateResolvers
}
