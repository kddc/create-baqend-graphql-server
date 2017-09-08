var { graphql, buildSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');
var { db } = require('baqend')
var util = require('util')

function resolveTypeReference(referenceType, referenceId, args, { db }) {
  return db[referenceType]
          .load(referenceId)
}
function resolveTypeReferenceCollection(referenceType, referenceIds, args, context) {
  return referenceIds
          .map((referenceId) => resolveReference(referenceType, referenceId, null, context))
}
function resolveObjectQuery(referenceType, { id }, { db }) {
  return resolveTypeReference(referenceType, id, null, { db })
}
function resolveCollectionQuery(referenceType, args, { db }) {
  return db[referenceType]
          .find()
          .resultList()
          .then(resultList => resultList.map(resultEntity => resultEntity.toJSON()))
}

const typeDefs = `
  type Post {
    title: String
    author: User
  }
  type User {
    username: String
    posts: Post
  },
  type Query {
    Post: Post
    allPosts: [Post]
    User: User
    allUsers: [User]
  }
`
const resolvers = {
  Post: {
    author: ({ author }, args, context) => { return resolveTypeReference('User', author, args, context) }
  },
  User: {
    posts: ({ posts }, args, context) => { return resolveTypeReferenceCollection('Post', posts, args, context) }
  },
  Query: {
    Post: (root, args, context) => { return resolveObjectQuery('Post', args, context) },
    allPosts: (root, args, context) => { return resolveCollectionQuery('Post', args, context) },
    User: (root, args, context) => { return resolveObjectQuery('User', args, context) },
    allUsers: (root, args, context) => { return resolveCollectionQuery('User', args, context) }
  }
}


var schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

db.connect('proud-filet-mignon-324').then((db) => {
  db.User.login('admin', 'temogu45').then((user) => {
    console.log("successfully connected to proud-filet-mignon-324 as " + db.User.me.username)
    graphql(schema, '{ allPosts { title author { username }}}', null, { db }).then((response) => {
      console.log(util.inspect(response, false, null))
    });
  })
})
