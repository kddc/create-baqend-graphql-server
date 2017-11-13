import { codeBlock } from 'common-tags'
import generateFieldFilterInputDefinitions from './filterInputs'

describe('Generate field filter input definitions', () => {
  test('it should generate a string filter input definition', () => {
    const params = {
      name: 'string',
      fieldType: 'scalar',
      elementType: 'String',
    }
    const expected = codeBlock`
      string: StringFilter
    `
    const definition = generateFieldFilterInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference filter input definition', () => {
    const params = {
      name: 'reference',
      fieldType: 'reference',
      elementType: 'TestReference',
    }
    const expected = codeBlock`
      reference: ObjectFilter
    `
    const definition = generateFieldFilterInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a embedded filter input definition', () => {
    const params = {
      name: 'embedded',
      fieldType: 'embedded',
      elementType: 'Embedded',
    }
    const expected = codeBlock`
      embedded: EmbeddedFilter
    `
    const definition = generateFieldFilterInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar collection filter input definition', () => {
    const params = {
      name: 'stringList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'scalar', elementType: 'String' }],
      },
    }
    const expected = codeBlock`
      stringList: CollectionFilter
    `
    const definition = generateFieldFilterInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })
})
