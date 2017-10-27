const resolvers = {
  Node: {
    __resolveType: obj => obj.id.split('/')[2],
  },
  Query: {
    node: (root, args, { baqendResolver }) => baqendResolver.resolveNodeQuery(args, {}),
    nodes: (root, args, { baqendResolver }) => baqendResolver.resolveNodeCollectionQuery(args, {}),
  },
}

export default resolvers
