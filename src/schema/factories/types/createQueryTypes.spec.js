import createQueryTypes, { queryTypeTemplates } from './createQueryTypes'

let objectTypes = [
  {
    name: 'TestObject',
    fields: [
      { name: 'string', superType: 'scalar', type: 'String' },
      { name: 'reference', superType: 'object', type: 'ReferenceClass' },
      { name: 'referenceCollection', superType: 'collection', type: 'ReferenceClass' }
    ]
  }
]

let expectedQueryTypes = [
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

describe('create queryTypes from objectTypes', () => {
  let queryTypes = createQueryTypes(objectTypes)

  test('queryTypes is array', () => {
    expect(Array.isArray(queryTypes)).toBeTruthy()
  })

  test('queryTypes has correct length', () => {
    expect(queryTypes).toHaveLength(queryTypeTemplates.length)
  })

  test('queryTypes equal expectedQueryTypes', () => {
    expect(queryTypes).toEqual(expectedQueryTypes)
  })

  test('queryTypes have correct properties', () => {
    queryTypes.forEach((queryType) => {
      expect(queryType).toEqual(expect.objectContaining({
        name: expect.any(String),
        args: expect.any(Object),
        type: expect.any(String),
        superType: expect.any(String)
      }))
    })
  })

  test('object queryType has correct values', () => {
    expect(queryTypes[0].name).toBe('TestObject'),
    expect(queryTypes[0].args).toEqual([]),
    expect(queryTypes[0].type).toBe('TestObject'),
    expect(queryTypes[0].superType).toBe('object')
  })

  test('collection queryType has correct values', () => {
    expect(queryTypes[1].name).toBe('allTestObjects'),
    expect(queryTypes[1].args).toEqual([]),
    expect(queryTypes[1].type).toBe('TestObject'),
    expect(queryTypes[1].superType).toBe('collection')
  })

})
