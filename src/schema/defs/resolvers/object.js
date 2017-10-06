import { codeBlock } from 'common-tags'

const objectResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayObjectResolvers(args)
  }
  return simpleObjectResolvers(args)
}

const simpleObjectResolvers = ({ name, fields }) => {
  const typeDef = codeBlock`
    ${name}: {
      ${fields.map(field => field).join('\n')}
    }
  `
  return [ typeDef ]
}

const relayObjectResolvers = ({ name, fields }) => {
  const typeDef = codeBlock`
    ${name}: {
      ${fields.map(field => field).join('\n')}
    }
  `
  const connectionDef = codeBlock`
    ${name}Connection: {
      edges: ({ edges }, args, { baqendResolver }) => {
        return edges
      },
      pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
        return pageInfo
      }
    }
  `
  const edgeDef = codeBlock`
    ${name}Edge: {
      cursor: (edge, args, { baqendResolver }) => {
        return edge.id
      },
      node: (edge, args, { baqendResolver }) => {
        return edge
      }
    }
  `
  return [ typeDef, connectionDef, edgeDef ]
}

export {
  objectResolvers
}
