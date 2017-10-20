import { codeBlock } from 'common-tags'

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const payloadDefinitions = (opts, { name, type, parentFields, fields }) => {
  let payloadDefs = []
  payloadDefs.push(codeBlock`
    type Create${name}Payload {
      clientMutationId: String!
      ${parentFields.join('\n')}
      ${fields.join('\n')}
    }
  `)
  payloadDefs.push(codeBlock`
    type Update${name}Payload {
      clientMutationId: String!
      ${parentFields.join('\n')}
      ${fields.join('\n')}
    }
  `)
  payloadDefs.push(codeBlock`
    type Delete${name}Payload {
      clientMutationId: String!
      id: ID!
    }
  `)
  return payloadDefs
}

const connectionPayloadDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionPayloadDefinitions(args)
  }
  return simpleConnectionPayloadDefinitions(args)
}

const relayConnectionPayloadDefinitions = ({ name, type, connections, parentFields, fields }) => {
  let connectionPayloadDefs = []
  connections.forEach(connection => {
    let valueType
    let addElementName
    let removeElementName
    if(connection.collectionType === 'Map') {
      addElementName = `addEntryTo${type}${ucfirst(connection.name)}`
      removeElementName = `removeEntryFrom${type}${ucfirst(connection.name)}`
    } else {
      valueType = connection.types[0]
      addElementName = `add${valueType.elementType}To${type}${ucfirst(connection.name)}`
      removeElementName = `remove${valueType.elementType}From${type}${ucfirst(connection.name)}`
    }
    connectionPayloadDefs.push(codeBlock`
      type ${ucfirst(addElementName)}Payload {
        clientMutationId: String!
        ${parentFields.join('\n')}
        ${fields.join('\n')}
      }
      type ${ucfirst(removeElementName)}Payload {
        clientMutationId: String!
        ${parentFields.join('\n')}
        ${fields.join('\n')}
      }
    `)
  })
  return connectionPayloadDefs
}

export {
  payloadDefinitions,
  connectionPayloadDefinitions
}
