import { codeBlock } from 'common-tags'
import { generateObjectTypeResolvers } from '../../src/schema/codegen/resolvers'

let inputObjectTypeResolvers = [
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

let expectedObjectTypeResolvers = codeBlock`
  TestObject: {
    reference: ({ reference }, args, context) => {
      return resolveObjectTypeReference('ReferenceObject', reference, args, context)
    },
    referenceCollection: ({ referenceCollection }, args, context) => {
      return resolveObjectTypeReferenceCollection('ReferenceObject', referenceCollection, args, context)
    }
  }
`

describe('create objectTypeResolvers code from objectTypeResolvers', () => {
  let objectTypeResolvers = generateObjectTypeResolvers(inputObjectTypeResolvers)
  test('objectTypeResolvers equal expectedObjectTypeResolvers', () => {
    expect(objectTypeResolvers).toEqual(expectedObjectTypeResolvers)
  })
})
