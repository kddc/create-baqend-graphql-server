import { codeBlock } from 'common-tags'

const idFilterType = codeBlock`
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
`

const stringFilterType = codeBlock`
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
`

const floatFilterType = codeBlock`
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
`

const intFilterType = codeBlock`
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
`

const booleanFilterType = codeBlock`
  input BooleanFilter {
    eq: Boolean
    ne: Boolean
    in: [Boolean!]
    nin: [Boolean!]
    exists: Boolean
  }
`

const dateFilterType = codeBlock`
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
`

const jsonFilterType = codeBlock`
  input JSONFilter {
    eq: JSON
    ne: JSON
    in: [JSON!]
    nin: [JSON!]
    exists: Boolean
  }
`

const objectFilterType = codeBlock`
  input ObjectFilter {
    exists: Boolean
  }
`

const collectionFilterType = codeBlock`
  input CollectionFilter {
    exists: Boolean
  }
`

const directionType = codeBlock`
  enum Direction {
    ASC
    DESC
  }
`

const filterTypes = [
  idFilterType,
  stringFilterType,
  floatFilterType,
  intFilterType,
  booleanFilterType,
  dateFilterType,
  jsonFilterType,
  objectFilterType,
  collectionFilterType,
  directionType
]

const filterDefinitions = (opts, { name, type, parentFields, fields }) => {
  fields = parentFields.concat(fields)
  const filterDef = codeBlock`
    input ${name}Filter {
      or: [${name}Filter!]
      and: [${name}Filter!]
      ${fields.map(field => {
        if(field.props.fieldType === 'object') {
          return `${field.props.name}: ${field.props.elementType}Filter`
        } else if(field.props.fieldType === 'collection') {
          return `${field.props.name}: CollectionFilter`
        } else {
          return `${field.props.name}: ${field.props.elementType}Filter`
        }
      })}
    }
  `
  const sortyByDef = codeBlock`
    input ${name}SortBy {
      ${fields.map(field => {
        return `${field.props.name}: Direction`
      })}
    }
  `
  return [ filterDef, sortyByDef ]
}

export {
  filterTypes,
  filterDefinitions
}
