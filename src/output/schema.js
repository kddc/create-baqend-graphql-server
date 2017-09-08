export const schema = `
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
`