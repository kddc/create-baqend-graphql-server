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

const relayObjectDefinitions = ({ name, type, abstract, parent, embedded, parentFields, fields }) => {
  const schemaType = abstract ? 'interface' : 'type'
  const typeDef = parentFields.length && codeBlock`
    ${schemaType} ${name} implements Node${parent && `, ${parent}` || ''} {
      ${parentFields.map(field => field)}
      ${fields.map(field => field)}
    }
  ` || codeBlock `
    ${schemaType} ${name} {
      ${fields.map(field => field)}
    }
  `
  return [ typeDef ]
}

export {
  objectDefinitions
}
