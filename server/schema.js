var { resolveObjectTypeReference, resolveTypeReferenceCollection, resolveObjectQuery, resolveCollectionQuery } = require('./resolvers')
var { makeExecutableSchema } = require('graphql-tools')

let typeDefs = `
  type Post {
    id: String
    title: String
    author: User
  }
  type User {
    id: String
    username: String
    posts: [Post]
  }
  type Query {
    Post: Post
    allPosts: [Post]
    User: User
    allUsers: [User]
  }
`
let resolvers = {
  Post: {
    author: ({ author }, args, context) => {
      return resolveObjectTypeReference('User', author, args, context)
    }
  },
  User: {
    posts: ({ posts }, args, context) => {
      return resolveObjectTypeReferenceCollection('Post', posts, args, context)
    }
  },
  Query: {
    Post: (root, args, context) => {
      return resolveObjectQuery('Post', args, context)
    },
    allPosts: (root, args, context) => {
      return resolveCollectionQuery('Post', args, context)
    },
    User: (root, args, context) => {
      return resolveObjectQuery('User', args, context)
    },
    allUsers: (root, args, context) => {
      return resolveCollectionQuery('User', args, context)
    }
  }
}

exports.schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
