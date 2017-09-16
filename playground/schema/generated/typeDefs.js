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
export default typeDefs