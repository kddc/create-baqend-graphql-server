import createObjectTypeResolvers from './createObjectTypeResolvers'

// input
let objectTypes = [
  {
    name: 'TestObject',
    fields: [
      { name: 'string', superType: 'scalar', type: 'String' },
      { name: 'reference', superType: 'object', type: 'ReferenceObject' },
      { name: 'referenceCollection', superType: 'collection', type: 'ReferenceObject' }
    ]
  }
]

// expected output
let expectedObjectTypeResolvers = [
  {
    name: 'TestObject',
    resolvers: [
      {
        name: 'reference',
        type: 'ReferenceObject',
        superType: 'object',
        resolve: [
          'resolveObjectTypeReference',
          [ '{ reference }', 'args', 'context' ],
          [ '\'ReferenceObject\'', 'reference', 'args', 'context' ]
        ]
      },
      {
        name: 'referenceCollection',
        type: 'ReferenceObject',
        superType: 'collection',
        resolve: [
          'resolveObjectTypeReferenceCollection',
          [ '{ referenceCollection }', 'args', 'context' ],
          [ '\'ReferenceObject\'', 'referenceCollection', 'args', 'context' ]
        ]
      }
    ]
  }
]

describe('create objectTypeResolvers from objectTypes', () => {
  let objectTypeResolvers = createObjectTypeResolvers(objectTypes)

  test('objectTypeResolvers is array', () => {
    expect(Array.isArray(objectTypeResolvers)).toBeTruthy()
  })

  test('objectTypeResolvers has correct length', () => {
    expect(objectTypeResolvers).toHaveLength(expectedObjectTypeResolvers.length)
  })

  test('objectTypeResolvers equals expectedObjectTypeResolvers', () => {
    expect(objectTypeResolvers).toEqual(expectedObjectTypeResolvers)
  })
})
