import { codeBlock } from 'common-tags'

const pageInfoType = codeBlock`
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }
`

const scalarConnectionTypes = codeBlock`
  type StringConnection {
    total: Int
    edges: [StringEdge]
    pageInfo: PageInfo!
  }
  type StringEdge {
    cursor: String!
    node: String
  }
`

const connectionDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionDefinitions(args)
  }
  return simpleConnectionDefinitions(args)
}

const simpleConnectionDefinitions = () => {
  return []
}

const relayConnectionDefinitions = ({ name, type, abstract }) => {
  const connectionDef = !abstract && codeBlock`
    type ${name}Connection {
      total: Int
      edges: [${name}Edge]
      pageInfo: PageInfo!
    }
  `
  const edgeDef = !abstract && codeBlock`
    type ${name}Edge {
      cursor: String!
      node: ${type}
    }
  `
  return [ connectionDef, edgeDef ]
}

const connectionTypes = [
  pageInfoType,
  scalarConnectionTypes
]

export {
  connectionTypes,
  connectionDefinitions
}
