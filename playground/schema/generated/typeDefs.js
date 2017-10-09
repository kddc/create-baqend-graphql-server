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
  type Post implements Node {
    id: ID!
    title: String!
    author: User!
  }
  type PostConnection {
    edges: [PostEdge]
    total: Int
    pageInfo: PageInfo!
  }
  type PostEdge {
    cursor: String!
    node: Post
  }
  type User implements Node {
    id: ID!
    username: String!
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
  }
  type UserConnection {
    edges: [UserEdge]
    total: Int
    pageInfo: PageInfo!
  }
  type UserEdge {
    cursor: String!
    node: User
  }
  input IDFilter {
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
  input ObjectFilter {
    eq: String
  }
  input CollectionFilter {
    eq: String
  }
  enum Direction {
    ASC
    DESC
  }
  input PostFilter {
    or: [UserFilter!]
    and: [UserFilter!]
    id: IDFilter
    title: StringFilter
    author: ObjectFilter
  }
  input PostSortBy {
    id: Direction
    title: Direction
    author: Direction
  }
  input UserFilter {
    or: [UserFilter!]
    and: [UserFilter!]
    id: IDFilter
    username: StringFilter
    posts: CollectionFilter
  }
  input UserSortBy {
    id: Direction
    username: Direction
    posts: Direction
  }
  type Query {
    node(id: ID!): Node
    nodes(ids: [ID!]!): [Node]!
    Post(id: ID): Post
    allPosts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    User(id: ID): User
    allUsers(filter: UserFilter, sortBy: UserSortBy, first: Int, after: String, last: Int, before: String): UserConnection
  }
`
export default typeDefs