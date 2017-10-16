import { codeBlock } from 'common-tags'

const connectionResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionResolvers(args)
  }
  return simpleConnectionResolvers(args)
}

const simpleConnectionResolvers = () => {
  return []
}

const relayConnectionResolvers = ({ name, abstract }) => {
  const connectionDef = !abstract && codeBlock`
    ${name}Connection: {
      edges: ({ edges }, args, { baqendResolver }) => {
        return edges
      },
      pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
        return pageInfo
      }
    }
  `
  const edgeDef = !abstract && codeBlock`
    ${name}Edge: {
      cursor: ({ cursor }, args, { baqendResolver }) => {
        return cursor
      },
      node: ({ node }, args, { baqendResolver }) => {
        return node
      }
    }
  `
  return [ connectionDef, edgeDef ]
}

export {
  connectionResolvers
}
