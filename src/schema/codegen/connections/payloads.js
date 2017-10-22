import { codeBlock } from 'common-tags'

const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * Generates the object input definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({
  name,
  connection,
  parentFields,
  fields,
}) => {
  const definitions = []
  let addElementName
  let removeElementName
  if (connection.collectionType === 'Map') {
    addElementName = `AddEntryTo${name}${ucfirst(connection.name)}`
    removeElementName = `RemoveEntryFrom${name}${ucfirst(connection.name)}`
  } else {
    const valueType = connection.types[0]
    addElementName = `Add${valueType.elementType}To${name}${ucfirst(connection.name)}`
    removeElementName = `Remove${valueType.elementType}From${name}${ucfirst(connection.name)}`
  }
  definitions.push(codeBlock`
    type ${addElementName}Payload {
      clientMutationId: String!
      ${parentFields}
      ${fields}
    }
  `)
  definitions.push(codeBlock`
    type ${removeElementName}Payload {
      clientMutationId: String!
      ${parentFields}
      ${fields}
    }
  `)
  return definitions
}

const generateConnectionPayloadDefinition = (opts, args) => relay(args)

const generateConnectionPayloadDefinitions = (opts, {
  name,
  abstract,
  embedded,
  connections,
  parentFields,
  fields,
}) => {
  const definitions = []
  if (!(embedded || abstract)) {
    connections.forEach((connection) => {
      definitions.push(generateConnectionPayloadDefinition(opts, {
        name, connection, parentFields, fields,
      }))
    })
  }
  return definitions
}

export default generateConnectionPayloadDefinitions
export { generateConnectionPayloadDefinition }
