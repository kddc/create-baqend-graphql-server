import { codeBlock } from 'common-tags'
import generateFieldConnectionInputDefinitions from './connectionInputs'

describe('Generate field connection type definitions', () => {
  test('it should return null for non map collection', () => {
    const expected = []
    const params = {
      fieldType: 'embedded',
      elementType: 'Embedded',
    }
    const definition = generateFieldConnectionInputDefinitions({}, params)
    expect(definition).toEqual(expected)

    const listParams = {
      fieldType: 'collection',
      elementType: { collectionType: 'List' },
    }
    const listDefinition = generateFieldConnectionInputDefinitions({}, listParams)
    expect(listDefinition).toEqual(expected)

    const setParams = {
      fieldType: 'collection',
      elementType: { collectionType: 'Set' },
    }
    const setDefinition = generateFieldConnectionInputDefinitions({}, setParams)
    expect(setDefinition).toEqual(expected)
  })

  test('it should generate a scalar x reference type definition', () => {
    const params = {
      fieldType: 'collection',
      elementType: {
        collectionType: 'Map',
        types: [
          { fieldType: 'scalar', elementType: 'String' },
          { fieldType: 'reference', elementType: 'TestReference' },
        ],
      },
    }
    const expected = [
      codeBlock`
        input StringTestReferenceMapInput {
          key: String!
          value: TestReferenceInput!
        }
      `, codeBlock`
        input StringTestReferenceMapInputIds {
          key: String!
          value: ID!
        }
      `,
    ]
    const definitions = generateFieldConnectionInputDefinitions({}, params)
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate a reference x reference type definition', () => {
    const params = {
      fieldType: 'collection',
      elementType: {
        collectionType: 'Map',
        types: [
          { fieldType: 'reference', elementType: 'TestReference' },
          { fieldType: 'reference', elementType: 'TestReference' },
        ],
      },
    }
    const expected = [
      codeBlock`
        input TestReferenceTestReferenceMapInput {
          key: ID!
          value: TestReferenceInput!
        }
      `, codeBlock`
        input TestReferenceTestReferenceMapInputIds {
          key: ID!
          value: ID!
        }
      `,
    ]
    const definitions = generateFieldConnectionInputDefinitions({}, params)
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
