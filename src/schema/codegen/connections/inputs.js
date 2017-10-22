import { codeBlock } from 'common-tags'

const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * Generates the object input definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({ name, connection }) => {
  const definitions = []
  if (connection.collectionType === 'Map') {
    const addEntityName = `addEntryTo${name}${ucfirst(connection.name)}`
    const removeEntityName = `removeEntryFrom${name}${ucfirst(connection.name)}`
    const keyType = connection.types[0]
    const valueType = connection.types[1]
    if (keyType.fieldType === 'reference' || valueType.fieldType === 'reference') {
      definitions.push(codeBlock`
        input ${ucfirst(addEntityName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}EntryIds: ${keyType.elementType}${valueType.elementType}MapInputIds
          ${connection.name}Entry: ${keyType.elementType}${valueType.elementType}MapInput
        }
      `)
      definitions.push(codeBlock`
        input ${ucfirst(removeEntityName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}EntryIds: ${keyType.elementType}${valueType.elementType}MapInputIds
        }
      `)
    } else {
      definitions.push(codeBlock`
        input ${ucfirst(addEntityName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}Entry: ${keyType.elementType}${valueType.elementType}MapInput
        }
      `)
      definitions.push(codeBlock`
        input ${ucfirst(removeEntityName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}Entry: ${keyType.elementType}${valueType.elementType}MapInput
        }
      `)
    }
  } else {
    const valueType = connection.types[0]
    const addElementName = `add${valueType.elementType}To${name}${ucfirst(connection.name)}`
    const removeElementName = `remove${valueType.elementType}From${name}${ucfirst(connection.name)}`
    if (valueType.fieldType === 'reference') {
      definitions.push(codeBlock`
        input ${ucfirst(addElementName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}EntryId: ID
          ${connection.name}Entry: ${valueType.elementType}Input
        }
      `)
      definitions.push(codeBlock`
        input ${ucfirst(removeElementName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}EntryId: ID
        }
      `)
    } else {
      definitions.push(codeBlock`
        input ${ucfirst(addElementName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}Entry: ${valueType.elementType}${(valueType.fieldType === 'embedded' && 'Input') || ''}
        }
      `)
      definitions.push(codeBlock`
        input ${ucfirst(removeElementName)}Input {
          clientMutationId: String!
          id: ID!
          ${connection.name}Entry: ${valueType.elementType}${(valueType.fieldType === 'embedded' && 'Input') || ''}
        }
      `)
    }
  }
  return definitions
}

const generateConnectionInputDefinition = (opts, args) => relay(args)

const generateConnectionInputDefinitions = (opts, {
  name,
  abstract,
  embedded,
  connections,
}) => {
  const definitions = []
  if (!(embedded || abstract)) {
    connections.forEach((connection) => {
      definitions.push(generateConnectionInputDefinition(opts, { name, connection }))
    })
  }
  return definitions
}

export default generateConnectionInputDefinitions
export { generateConnectionInputDefinition }
