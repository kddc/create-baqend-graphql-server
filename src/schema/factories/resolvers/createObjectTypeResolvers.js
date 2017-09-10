import { codeBlock } from 'common-tags'

const createResolveArgs = (referenceName, referenceType, referenceSuperType) => {
  let callerArgs = [`{ ${referenceName} }`, 'args', 'context']
  let resolverArgs = [`'${referenceType}'`, referenceName, 'args', 'context']
  switch(referenceSuperType) {
    case 'object':
      return ['resolveObjectTypeReference', callerArgs, resolverArgs]
    case 'collection':
      return ['resolveObjectTypeReferenceCollection', callerArgs, resolverArgs]
  }
}

const createObjectTypeResolvers = (types) => {
  return types.map((type) => {
    return {
      name: type.name,
      resolvers: type.fields
      .filter((field) => {
        return (field.superType === 'object' || field.superType === 'collection')
      })
      .map((field) => {
        return {
          name: field.name,
          type: field.type,
          superType: field.superType,
          resolve: createResolveArgs(field.name, field.type, field.superType)
        }
      })
    }
  })
}

export default createObjectTypeResolvers
