import { codeBlock } from 'common-tags'

export default class TypeResolversFactory {
  constructor() {}

  createFromTypes(types) {
    return this.createTypeResolvers(types)
  }

  createTypeResolvers(types) {
    return types.map((type) => {
      return {
        name: type.name,
        resolvers: type.fields
          .filter((field) => {
            console.log(field)
            return (field.superType === 'object' || field.superType === 'collection')
          })
          .map((field) => {
            return {
              name: field.name,
              type: field.type,
              superType: field.superType,
              resolve: this.createResolveMethod(field.name, field.type, field.superType)
            }
          })
      }
    })
  }

  createResolveMethod(referenceName, referenceType, referenceSuperType) {
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

}
