import { codeBlock } from 'common-tags'
import generateFieldConnectionTypeDefinitions from './connectionTypes'

describe('Generate field connection type definitions', () => {
  test('it should return null for non map collection', () => {
    const expected = []
    const params = {
      fieldType: 'embedded',
      elementType: 'Embedded',
    }
    const definition = generateFieldConnectionTypeDefinitions({}, params)
    expect(definition).toEqual(expected)

    const listParams = {
      fieldType: 'collection',
      elementType: { collectionType: 'List' },
    }
    const listDefinition = generateFieldConnectionTypeDefinitions({}, listParams)
    expect(listDefinition).toEqual(expected)

    const setParams = {
      fieldType: 'collection',
      elementType: { collectionType: 'Set' },
    }
    const setDefinition = generateFieldConnectionTypeDefinitions({}, setParams)
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
    const expected = codeBlock`
      type StringTestReferenceMapEntry {
        key: String
        value: TestReference
      }
    `
    const definition = generateFieldConnectionTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
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
    const expected = codeBlock`
      type StringTestReferenceMapEntry {
        key: String
        value: TestReference
      }
    `
    const definition = generateFieldConnectionTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })
})
