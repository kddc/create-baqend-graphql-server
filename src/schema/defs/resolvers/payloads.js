import { codeBlock } from 'common-tags'

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const payloadResolvers = (opts, { name, type, fields }) => {
  let payloadResolverDefs = []
  if(fields && fields.length) {
    payloadResolverDefs.push(codeBlock`
      Create${name}Payload: {
        ${fields.map(field => field).join(',\n')}
      },
      Update${name}Payload: {
        ${fields.map(field => field).join(',\n')}
      }
    `)
  }
  return payloadResolverDefs
}

const connectionPayloadResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionPayloadResolvers(args)
  }
  return simpleConnectionPayloadResolvers(args)
}

const relayConnectionPayloadResolvers = ({ name, type, connections, fields }) => {
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
      ${ucfirst(addElementName)}Payload: {
        ${fields.map(field => field).join(',\n')}
      },
      ${ucfirst(removeElementName)}Payload: {
        ${fields.map(field => field).join(',\n')}
      }
    `)
  })
  return connectionPayloadDefs
}

export {
  payloadResolvers,
  connectionPayloadResolvers
}
