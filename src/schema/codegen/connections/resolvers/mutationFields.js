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
    definitions.push(codeBlock`
      ${addEntityName}: (root, args, { baqendMutator }) => {
        return baqendMutator.addEntryToCollection('${name}', '${connection.name}', args, {})
      }
    `)
    definitions.push(codeBlock`
      ${removeEntityName}: (root, args, { baqendMutator }) => {
        return baqendMutator.removeEntryFromCollection('${name}', '${connection.name}', args, {})
      }
    `)
  } else {
    const valueType = connection.types[0]
    const addEntityName = `add${valueType.elementType}To${name}${ucfirst(connection.name)}`
    const removeEntityName = `remove${valueType.elementType}From${name}${ucfirst(connection.name)}`
    definitions.push(codeBlock`
      ${addEntityName}: (root, args, { baqendMutator }) => {
        return baqendMutator.addEntryToCollection('${name}', '${connection.name}', args, {})
      }
    `)
    definitions.push(codeBlock`
      ${removeEntityName}: (root, args, { baqendMutator }) => {
        return baqendMutator.removeEntryFromCollection('${name}', '${connection.name}', args, {})
      }
    `)
  }
  return definitions
}

const generateConnectionMutationFieldResolverDefinition = (opts, args) => relay(args)

const generateConnectionMutationFieldResolverDefinitions = (opts, {
  name,
  abstract,
  embedded,
  connections,
}) => {
  const definitions = []
  if (!(embedded || abstract)) {
    connections.forEach((connection) => {
      definitions.push(generateConnectionMutationFieldResolverDefinition(opts, { name, connection }))
    })
  }
  return definitions
}

export default generateConnectionMutationFieldResolverDefinitions
export { generateConnectionMutationFieldResolverDefinition }
