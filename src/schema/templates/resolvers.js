import { codeBlock } from 'common-tags'

const resolveObjectTypeReference = (callerArgs, resolverArgs) => codeBlock`
  (${callerArgs}) => {
    return resolveObjectTypeReference(${resolverArgs})
  }
`

const resolveObjectTypeReferenceCollection = (callerArgs, resolverArgs) => codeBlock`
  (${callerArgs}) => {
    return resolveTypeReferenceCollection(${resolverArgs})
  }
`

const resolveObjectQuery = (callerArgs, resolverArgs) => codeBlock`
  (${callerArgs}) => {
    return resolveObjectQuery(${resolverArgs})
  }
`

const resolveCollectionQuery = (callerArgs, resolverArgs) => codeBlock`
  (${callerArgs}) => {
    return resolveCollectionQuery(${resolverArgs})
  }
`

export {
  resolveObjectTypeReference,
  resolveObjectTypeReferenceCollection,
  resolveObjectQuery,
  resolveCollectionQuery
}
