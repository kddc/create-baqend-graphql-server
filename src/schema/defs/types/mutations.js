import { codeBlock } from 'common-tags'

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const mutationDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayMutationDefinitions(args)
  }
  return simpleMutationDefinitions(args)
}

const simpleMutationDefinitions = ({ name, type }) => {
  const createDef = codeBlock`
    create${type}(input: Create${type}Input): ${type}
  `
  const updateDef = codeBlock`
    update${type}(id: ID!, input: Update${type}Input): ${type}
  `
  return [ createDef, updateDef ]
}

const relayMutationDefinitions = ({ name, type }) => {
  let mutationDefs = []
  mutationDefs.push(codeBlock`
    create${type}(input: Create${type}Input): Create${type}Payload
  `)
  mutationDefs.push(codeBlock`
    update${type}(input: Update${type}Input): Update${type}Payload
  `)
  mutationDefs.push(codeBlock`
    delete${type}(input: Delete${type}Input): Delete${type}Payload
  `)
  return mutationDefs
}

const connectionMutationDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionMutationDefinitions(args)
  }
  return simpleConnectionMutationDefinitions(args)
}

const relayConnectionMutationDefinitions = ({ name, type, connections }) => {
  let connectionMutationDefs = []
  connections.forEach(connection => {
    if(connection.collectionType === 'Map') {
      const addEntityName = `addEntryTo${type}${ucfirst(connection.name)}`
      const removeEntityName = `removeEntryFrom${type}${ucfirst(connection.name)}`
      connectionMutationDefs.push(codeBlock`
        # add Element to ${type} List
        ${addEntityName}(input: ${ucfirst(addEntityName)}Input): ${ucfirst(addEntityName)}Payload
        # removes Element from ${type} List
        ${removeEntityName}(input: ${ucfirst(removeEntityName)}Input): ${ucfirst(removeEntityName)}Payload
      `)
    } else {
      const valueType = connection.types[0]
      const addEntityName = `add${valueType.elementType}To${type}${ucfirst(connection.name)}`
      const removeEntityName = `remove${valueType.elementType}From${type}${ucfirst(connection.name)}`
      connectionMutationDefs.push(codeBlock`
        # add Element to ${type} List
        ${addEntityName}(input: ${ucfirst(addEntityName)}Input): ${ucfirst(addEntityName)}Payload
        # removes Element from ${type} List
        ${removeEntityName}(input: ${ucfirst(removeEntityName)}Input): ${ucfirst(removeEntityName)}Payload
      `)
    }
  })
  return connectionMutationDefs
}

export {
  mutationDefinitions,
  connectionMutationDefinitions
}
