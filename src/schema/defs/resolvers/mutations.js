import { codeBlock } from 'common-tags'

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const mutationResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayMutationResolvers(args)
  }
  return simpleMutationResolvers(args)
}

const relayMutationResolvers = ({ name, type }) => {
  let mutationResolverDefs = []
  mutationResolverDefs.push(codeBlock`
    create${type}: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('${type}', args, {})
    }
  `)
  mutationResolverDefs.push(codeBlock`
    update${type}: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('${type}', args, {})
    }
  `)
  mutationResolverDefs.push(codeBlock`
    delete${type}: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('${type}', args, {})
    }
  `)
  return mutationResolverDefs
}

const connectionMutationResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionMutationResolvers(args)
  }
  return simpleConnectionMutationResolvers(args)
}

const relayConnectionMutationResolvers = ({ name, type, connections }) => {
  let connectionMutationResolverDefs = []
  connections.forEach(connection => {
    if(connection.collectionType === 'Map') {
      const addEntityName = `addEntryTo${type}${ucfirst(connection.name)}`
      const removeEntityName = `removeEntryFrom${type}${ucfirst(connection.name)}`
      connectionMutationResolverDefs.push(codeBlock`
        ${addEntityName}: (root, args, { baqendMutator }) => {
          return baqendMutator.addEntryToCollection('${type}', '${connection.name}', args, {})
        },
        ${removeEntityName}: (root, args, { baqendMutator }) => {
          return baqendMutator.removeEntryFromCollection('${type}', '${connection.name}', args, {})
        }
      `)
    } else {
      const valueType = connection.types[0]
      const addEntityName = `add${valueType.elementType}To${type}${ucfirst(connection.name)}`
      const removeEntityName = `remove${valueType.elementType}From${type}${ucfirst(connection.name)}`
      connectionMutationResolverDefs.push(codeBlock`
        ${addEntityName}: (root, args, { baqendMutator }) => {
          return baqendMutator.addEntryToCollection('${type}', '${connection.name}', args, {})
        },
        ${removeEntityName}: (root, args, { baqendMutator }) => {
          return baqendMutator.removeEntryFromCollection('${type}', '${connection.name}', args, {})
        }
      `)
    }
  })
  return connectionMutationResolverDefs
}

export {
  mutationResolvers,
  connectionMutationResolvers
}
