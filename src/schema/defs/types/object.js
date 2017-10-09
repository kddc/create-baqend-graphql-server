import { codeBlock } from 'common-tags'

const objectDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayObjectDefinitions(args)
  }
  return simpleObjectDefinitions(args)
}

const simpleObjectDefinitions = ({ name, fields }) => {
  const typeDef = codeBlock`
    type ${name} {
      ${fields.map(field => field)}
    }
  `
  return [ typeDef ]
}

const relayObjectDefinitions = ({ name, type, fields }) => {
  const typeDef = codeBlock`
    type ${name} implements Node {
      ${fields.map(field => field)}
    }
  `
  const connectionDef = codeBlock`
    type ${name}Connection {
      edges: [${name}Edge]
      total: Int
      pageInfo: PageInfo!
    }
  `
  const edgeDef = codeBlock`
    type ${name}Edge {
      cursor: String!
      node: ${type}
    }
  `
  return [ typeDef, connectionDef, edgeDef ]
}

export {
  objectDefinitions
}
