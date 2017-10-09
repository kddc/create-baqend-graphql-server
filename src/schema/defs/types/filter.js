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

const objectFilterType = codeBlock`
  input ObjectFilter {
    eq: String
  }
`

const collectionFilterType = codeBlock`
  input CollectionFilter {
    eq: String
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
  objectFilterType,
  collectionFilterType,
  directionType
]

const filterDefinitions = (opts, { name, type, fields }) => {
  const filterDef = codeBlock`
    input ${name}Filter {
      or: [UserFilter!]
      and: [UserFilter!]
      ${fields.map(field => {
        if(field.props.superType === 'object') {
          return `${field.props.name}: ObjectFilter`
        } else if(field.props.superType === 'collection') {
          return `${field.props.name}: CollectionFilter`
        } else {
          return `${field.props.name}: ${field.props.type}Filter`
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
