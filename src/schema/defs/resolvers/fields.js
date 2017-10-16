import { codeBlock } from 'common-tags'

const getResolveStrategy = ({ name, fieldType, elementType }) => {
  switch(fieldType) {
    case 'reference':
      return `return baqendResolver.resolveReference('${elementType}', ${name}, args)`
    case 'collection':
      switch(elementType.collectionType) {
        case 'List':
        case 'Set':
          const collectionType = elementType.collectionType
          const entryFieldType = elementType.types[0].fieldType
          const entryElementType = elementType.types[0].elementType
          switch(entryFieldType) {
            case 'reference':
            return `return baqendResolver.resolveReference${collectionType}('${entryElementType}', ${name}, args)`
            case 'embedded':
            case 'scalar':
            return `return baqendResolver.resolve${collectionType}(${name}, args)`
          }
        case 'Map':
          const keyType = elementType.types[0].fieldType !== 'scalar' && `'${elementType.types[0].elementType}'` || null
          const valueType = elementType.types[1].fieldType !== 'scalar' && `'${elementType.types[1].elementType}'` || null
          return `return baqendResolver.resolveMap([ ${keyType}, ${valueType} ], ${name}, args)`
          // return codeBlock`
          //   const keys = Object.keys(${name})
          //   const values = Object.values(${name})
          //   const resolvedKeys = ${getResolveStrategy({
          //     name: 'keys',
          //     fieldType: 'collection',
          //     elementType: keyType
          //   }).replace(/^return /, '')}
          //   const resolvedValues = ${getResolveStrategy({
          //     name: 'values',
          //     fieldType: 'collection',
          //     elementType: valueType
          //   }).replace(/^return /, '')}
          //   return Promise.all([ resolvedKeys, resolvedValues ]).then(res => {
          //     return baqendResolver.combine(res[0], res[1])
          //   })
          // `
      }
    case 'embedded':
      return `return ${name}`
    case 'scalar':
      return `return ${name}`
  }
}

const fieldResolvers = (opts, args) => {
  const { name } = args
  const resolveStrategy = getResolveStrategy(args)
  return codeBlock`
    ${name}: ({ ${name} }, args, { baqendResolver }) => {
      ${resolveStrategy}
    }
  `
}

export {
  fieldResolvers
}
