import { codeBlock } from 'common-tags'

const createResolveMethod = (referenceName, referenceType, referenceSuperType) => {
  let args = [`{ ${referenceName} }`, 'args', 'context']
  switch(referenceSuperType) {
    case 'object':
    return codeBlock`
    (${args.join(', ')}) => {
      return resolveTypeReference('${referenceType}', ${referenceName}, args, context)
    }`
    case 'collection':
    return codeBlock`
    (${args.join(', ')}) => {
      return resolveTypeReferenceCollection('${referenceType}', ${referenceName}, args, context)
    }`
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
          resolve: createResolveMethod(field.name, field.type, field.superType)
        }
      })
    }
  })
}

export default createObjectTypeResolvers
