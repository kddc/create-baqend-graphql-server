const typeDefs = `
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
  input FloatFilter {
    eq: Float
    ne: Float
    in: [Float!]
    nin: [Float!]
    exists: Boolean
    gt: Float
    gte: Float
    lt: Float
    lte: Float
  }
  input IntFilter {
    eq: Int
    ne: Int
    in: [Int!]
    nin: [Int!]
    exists: Boolean
    gt: Int
    gte: Int
    lt: Int
    lte: Int
  }
  input BooleanFilter {
    eq: Boolean
    ne: Boolean
    in: [Boolean!]
    nin: [Boolean!]
    exists: Boolean
  }
  input DateFilter {
    eq: Date
    ne: Date
    in: [Date!]
    nin: [Date!]
    exists: Date
    gt: Date
    gte: Date
    lt: Date
    lte: Date
  }
  input JSONFilter {
    eq: JSON
    ne: JSON
    in: [JSON!]
    nin: [JSON!]
    exists: Boolean
  }

  input GeoPointFilter {
    nearSphere: NearSphereFilter
  }
  input NearSphereFilter {
    geometry: Geometry
    maxDistance: Float
  }
  input Geometry {
    coordinates: [Float]
    type: GeometryType
  }
  enum GeometryType {
    Point
  }

  input ObjectFilter {
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
  input CollectionFilter {
    exists: Boolean
  }
  enum Direction {
    ASC
    DESC
  }
`
export default typeDefs
