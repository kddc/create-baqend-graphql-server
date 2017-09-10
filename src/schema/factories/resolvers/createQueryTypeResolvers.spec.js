import createQueryTypeResolvers from './createQueryTypeResolvers'

let queryTypes = [
  {
    name: 'TestObject',
    args: [],
    type: 'TestObject',
    superType: 'object'
  },
  {
    name: 'allTestObjects',
    args: [],
    type: 'TestObject',
    superType: 'collection'
  }
]

let expectedQueryTypeResolvers = [
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

describe('create queryTypeResolvers from queryTypes', () => {
  let queryTypeResolvers = createQueryTypeResolvers(queryTypes)

  test('queryTypeResolvers is array', () => {
    expect(Array.isArray(queryTypeResolvers)).toBeTruthy()
  })

  test('queryTypeResolvers has correct length', () => {
    expect(queryTypeResolvers).toHaveLength(expectedQueryTypeResolvers.length)
  })

  test('queryTypeResolvers equals expectedQueryTypeResolvers', () => {
    expect(queryTypeResolvers).toEqual(expectedQueryTypeResolvers)
  })
})
