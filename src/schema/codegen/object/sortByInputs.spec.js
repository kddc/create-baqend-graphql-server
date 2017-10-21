import { codeBlock } from 'common-tags'
import generateSortByInputDefinitions from './sortByInputs'

const parentFields = ['id: Direction']
const fields = ['string: Direction']

describe('Generate object sortBy input definitions', () => {
  test('it should generate no sortBy input definitions for abstract types', () => {
    const params = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields,
      fields,
    }
    const expected = []
    const definitions = generateSortByInputDefinitions({}, params)
    expect(definitions.length).toBe(0)
    expect(definitions).toEqual(expected)
  })

  test('it should generate reference sortBy input definitions', () => {
    const params = {
      name: 'TestObject',
      abstract: false,
      embedded: false,
      parent: 'Object',
      parentFields,
      fields,
    }
    const expected = codeBlock`
      input TestObjectSortBy {
        ${parentFields}
        ${fields}
      }
    `
    const definitions = generateSortByInputDefinitions({}, params)
    expect(definitions.length).toBe(1)
    expect(definitions[0]).toEqual(expected)
  })

  test('it should generate embedded sortBy input definitions', () => {
    const params = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
      parent: 'Object',
      parentFields: null,
      fields,
    }
    const expected = codeBlock`
      input EmbeddedSortBy {
        ${fields}
      }
    `
    const definitions = generateSortByInputDefinitions({}, params)
    expect(definitions.length).toBe(1)
    expect(definitions[0]).toEqual(expected)
  })
})
