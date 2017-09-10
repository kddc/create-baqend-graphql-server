import { codeBlock } from 'common-tags'

const parseResolverArgs = (args) => {
  let callerArgs = args.resolve[1].join(', ')
  let resolverArgs = args.resolve[2].join(', ')
  return {
    callerArgs,
    resolverArgs
  }
}

const resolveObjectTypeReference = (args) => {
  let { callerArgs, resolverArgs } = parseResolverArgs(args)
  return codeBlock`
    ${args.name}: (${callerArgs}) => {
      return resolveObjectTypeReference(${resolverArgs})
    }
  `
}

const resolveObjectTypeReferenceCollection = (args) => {
  let { callerArgs, resolverArgs } = parseResolverArgs(args)
  return codeBlock`
    ${args.name}: (${callerArgs}) => {
      return resolveObjectTypeReferenceCollection(${resolverArgs})
    }
  `
}

const resolveObjectQuery = (args) => {
  let { callerArgs, resolverArgs } = parseResolverArgs(args)
  return codeBlock`
    ${args.name}: (${callerArgs}) => {
      return resolveObjectQuery(${resolverArgs})
    }
  `
}

const resolveCollectionQuery = (args) => {
  let { callerArgs, resolverArgs } = parseResolverArgs(args)
  return codeBlock`
    ${args.name}: (${callerArgs}) => {
      return resolveCollectionQuery(${resolverArgs})
    }
  `
}

export {
  resolveObjectTypeReference,
  resolveObjectTypeReferenceCollection,
  resolveObjectQuery,
  resolveCollectionQuery
}
