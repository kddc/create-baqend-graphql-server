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
      ${fields.map(field => field).join(',\n')}
    }
  `
  return [ typeDef ]
}

const relayObjectResolvers = ({ name, abstract, fields }) => {
  const typeDef = fields && fields.length && codeBlock`
    ${name}: {
      ${fields.map(field => field).join(',\n')}
    }
  `
  return [ typeDef ]
}

export {
  objectResolvers
}
