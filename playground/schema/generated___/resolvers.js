let resolvers = {
  Post: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args, {})
    }
  },
  User: {
    posts: ({ posts }, args, { baqendResolver }) => {
      return posts && baqendResolver.resolveReferenceCollection('Post', posts, args, {}) || []
    }
  },
  PostConnection: {
    edges: (edges, args, { baqendResolver}) => {
      return edges
    },
    pageInfo: (edges, args, { baqendResolver}) => {
      console.log(args)
      return {
        endCursor: "123",
        hasNextPage: true,
        hasPreviousPage: true,
        startCursor: "456"
      }
    }
  },
  PostEdge: {
    cursor: (edge, args, { baqendResolver }) => {
      return edge.id
    },
    node: (edge, args, { baqendResolver }) => {
      return edge
    }
  },
  UserConnection: {
    edges: ({ edges }, args, { baqendResolver}) => {
      return edges
    },
    pageInfo: ({ edges }, args, { baqendResolver}) => {
      return {
        endCursor: "123",
        hasNextPage: true,
        hasPreviousPage: true,
        startCursor: "456"
      }
    }
  },
  UserEdge: {
    cursor: (edge, args, { baqendResolver }) => {
      return edge.id
    },
    node: (edge, args, { baqendResolver }) => {
      return edge
    }
  },
  Query: {
    Post: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Post', args, {})
    },
    allPosts: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('Post', args, {})
    },
    User: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('User', args, {})
    },
    allUsers: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('User', args, {})
    }
  }
}
export default resolvers
