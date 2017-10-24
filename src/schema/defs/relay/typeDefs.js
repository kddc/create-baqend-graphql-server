const typeDefs = `
  interface Node {
    id: ID!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }
  type StringConnection {
    total: Int
    edges: [StringEdge]
    pageInfo: PageInfo!
  }
  type StringEdge {
    cursor: String!
    node: String
  }
  type Query {
    node(id: ID!): Node
    nodes(ids: [ID!]!): [Node]!
  }
`
export default typeDefs
