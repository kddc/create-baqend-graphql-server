import { codeBlock } from 'common-tags'
import { generateQueryTypeResolvers } from '../../src/schema/codegen/resolvers'

let inputQueryTypeResolvers = [
  {
    name: 'TestObject',
    type: 'TestObject',
    superType: 'object',
    resolve: [
      'resolveObjectQuery',
      [ 'root', 'args', 'context' ],
      [ '\'TestObject\'', 'args', 'context' ]
    ]
  },
  {
    name: 'allTestObjects',
    type: 'TestObject',
    superType: 'collection',
    resolve: [
      'resolveCollectionQuery',
      [ 'root', 'args', 'context' ],
      [ '\'TestObject\'', 'args', 'context' ]
    ]
  }
]

let expectedQueryTypeResolvers = codeBlock`
  Query: {
    TestObject: (root, args, context) => {
      return resolveObjectQuery('TestObject', args, context)
    },
    allTestObjects: (root, args, context) => {
      return resolveCollectionQuery('TestObject', args, context)
    }
  }
`

describe('create queryTypeResolvers code from queryTypeResolvers', () => {
  let queryTypeResolvers = generateQueryTypeResolvers(inputQueryTypeResolvers)
  test('queryTypeResolvers equal expectedQueryTypeResolvers', () => {
    expect(queryTypeResolvers).toEqual(expectedQueryTypeResolvers)
  })
})
