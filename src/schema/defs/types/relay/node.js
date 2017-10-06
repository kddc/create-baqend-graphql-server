import { codeBlock } from 'common-tags'

const nodeInterface = codeBlock`
  interface Node {
    id: ID!
  }
`

const nodeField = codeBlock`
  node(id: ID!): Node
`

const nodesField = codeBlock`
  nodes(ids: [ID!]!): [Node]!
`

export {
  nodeInterface,
  nodeField,
  nodesField
}
