let resolvers = {
  Post: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args, {})
    }
  },
  User: {
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollection('Post', posts, args, {})
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