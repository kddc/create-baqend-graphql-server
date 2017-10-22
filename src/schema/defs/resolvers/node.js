Node: {
  __resolveType: obj => {
    return obj.id.split('/')[2]
  }
},
  node: (root, args, { baqendResolver }) => {
    return baqendResolver.resolveNodeQuery(args, {})
  },
  nodes: (root, args, { baqendResolver }) => {
    return baqendResolver.resolveNodeCollectionQuery(args, {})
  },
