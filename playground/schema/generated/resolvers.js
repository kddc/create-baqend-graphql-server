let resolvers = {
  Post: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    }
  },
  PostConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  PostEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ edge }, args, { baqendResolver }) => {
      return edge
    }
  },
  User: {
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollection('Post', posts, args)
    }
  },
  UserConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  UserEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ edge }, args, { baqendResolver }) => {
      return edge
    }
  },
  Query: {
    Post: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Post', id, {})
    },
    allPosts: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('Post', args, {})
    },
    User: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('User', id, {})
    },
    allUsers: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('User', args, {})
    }
  }
}
export default resolvers