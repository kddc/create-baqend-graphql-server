let typeDefs = `
  interface Node {
    id: ID!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  input UserFilter {
    or: [UserFilter!]
    and: [UserFilter!]
    username: StringFilter
    id: StringFilter
  }

  input UserSortBy {
    id: Direction
    username: Direction
  }

  enum Direction {
    ASC
    DESC
  }

  input StringFilter {
  	eq: String
    ne: String
    in: [String!]
    nin: [String!]
    exists: Boolean
    gt: String
    gte: String
    lt: String
    lte: String
    regex: String
  }

  type Post implements Node {
    id: ID!
    title: String
    author: User
  }

  type PostEdge {
    cursor: String!
    node: Post
  }

  type PostConnection {
    edges: [PostEdge]
    pageInfo: PageInfo!
  }

  type UserEdge {
    cursor: String!
    node: User
  }

  type UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo!
  }

  type User implements Node {
    id: ID!
    username: String
    posts(first: Int, after: String, last: Int, before: String): PostConnection
  }

  type Query {
    Post: Post
    allPosts(first: Int, after: String, last: Int, before: String): PostConnection
    User: User
    allUsers(filter: UserFilter, sortBy: UserSortBy, first: Int, after: String, last: Int, before: String): UserConnection
  }
`
export default typeDefs
