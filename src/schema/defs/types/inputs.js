import { codeBlock } from 'common-tags'
import { fieldInputDefinitions } from './fields'

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const lcfirst = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const inputDefinitions = (opts, { name, type, embedded, fields }) => {
  let inputDefs = []
  inputDefs.push(codeBlock`
    input ${name}Input {
      id: ID
      ${fields.join('\n')}
    }
  `)
  if(!embedded) {
    inputDefs.push(codeBlock`
      input Create${name}Input {
        clientMutationId: String!
        id: ID
        ${fields.join('\n')}
      }
      input Update${name}Input {
        clientMutationId: String!
        id: ID!
        ${fields.join('\n')}
      }
      input Delete${name}Input {
        clientMutationId: String!
        id: ID!
      }
    `)
  }
  return inputDefs
}

const connectionInputDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayConnectionInputDefinitions(args)
  }
  return simpleConnectionInputDefinitions(args)
}

const relayConnectionInputDefinitions = ({ name, type, connections }) => {
  let connectionInputDefs = []
  connections.forEach(connection => {
    if(connection.collectionType === 'Map') {
      const addEntityName = `addEntryTo${type}${ucfirst(connection.name)}`
      const removeEntityName = `removeEntryFrom${type}${ucfirst(connection.name)}`
      const keyType = connection.types[0]
      const valueType = connection.types[1]
      connectionInputDefs.push(codeBlock`
        input ${ucfirst(addEntityName)}Input {
          clientMutationId: String!
          id: ID!
          ${(keyType.fieldType === 'reference' || valueType.fieldType === 'reference') ?
            codeBlock`
              ${connection.name}EntryIds: ${keyType.elementType}${valueType.elementType}MapInputIds
              ${connection.name}Entry: ${keyType.elementType}${valueType.elementType}MapInput
            `
          : codeBlock`
              ${connection.name}Entry: ${keyType.elementType}${valueType.elementType}MapInput
            `
          }
        }
        input ${ucfirst(removeEntityName)}Input {
          clientMutationId: String!
          id: ID!
          ${(keyType.fieldType === 'reference' || valueType.fieldType === 'reference') ?
            codeBlock`
              ${connection.name}EntryIds: ${keyType.elementType}${valueType.elementType}MapInputIds
            `
          : codeBlock`
              ${connection.name}Entry: ${keyType.elementType}${valueType.elementType}MapInput
            `
          }
        }
      `)
    } else {
      const valueType = connection.types[0]
      const addElementName = `add${valueType.elementType}To${type}${ucfirst(connection.name)}`
      const removeElementName = `remove${valueType.elementType}From${type}${ucfirst(connection.name)}`
      connectionInputDefs.push(codeBlock`
        input ${ucfirst(addElementName)}Input {
          clientMutationId: String!
          id: ID!
          ${(valueType.fieldType === 'reference') ?
            codeBlock`
              ${connection.name}EntryId: ID
              ${connection.name}Entry: ${valueType.elementType}Input
            `
          : codeBlock`
              ${connection.name}Entry: ${valueType.elementType}${valueType.fieldType === 'embedded' && 'Input' || ''}
            `
          }
        }
        input ${ucfirst(removeElementName)}Input {
          clientMutationId: String!
          id: ID!
          ${(valueType.fieldType === 'reference') ?
            codeBlock`
              ${connection.name}EntryId: ID
            `
          : codeBlock`
              ${connection.name}Entry: ${valueType.elementType}${valueType.fieldType === 'embedded' && 'Input' || ''}
            `
          }
        }
      `)
    }
  })
  return connectionInputDefs
}

export {
  inputDefinitions,
  connectionInputDefinitions
}
