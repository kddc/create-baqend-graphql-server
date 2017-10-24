import { codeBlock } from 'common-tags'

const generateResolvers = (opts, args) => {
  const { resolvers, queryResolvers, mutationResolvers } = args
  return codeBlock`
    let resolvers = {
      ${resolvers.join(',\n')},
      Query: {
        ${queryResolvers.join(',\n')}
      },
      Mutation: {
        ${mutationResolvers.join(',\n')}
      }
    }
    export default resolvers
  `
}

export {
  generateResolvers,
}
