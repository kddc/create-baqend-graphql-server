import { codeBlock } from 'common-tags'

const getResolveStrategy = ({ name, type, superType }) => {
  switch(superType) {
    case 'object':
      return `baqendResolver.resolveReference('${type}', ${name}, args)`
    case 'collection':
      return `baqendResolver.resolveReferenceCollection('${type}', ${name}, args)`
    case 'scalar':
      return name
  }
}

const fieldResolvers = (opts, args) => {
  const { name } = args
  const resolveStrategy = getResolveStrategy(args)
  return codeBlock`
    ${name}: ({ ${name} }, args, { baqendResolver }) => {
      return ${resolveStrategy}
    }
  `
}

export {
  fieldResolvers
}
