import { codeBlock } from 'common-tags'
import generateFilterInputDefinitions from './filterInputs'

const parentFields = ['id: IDFilter']
const fields = ['string: StringFilter']

describe('Generate object filter input definitions', () => {
  test('it should generate no filter input definitions for abstract types', () => {
    const params = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields,
      fields,
    }
    const expected = []
    const definitions = generateFilterInputDefinitions({}, params)
    expect(definitions.length).toBe(0)
    expect(definitions).toEqual(expected)
  })

  test('it should generate object filter input definitions', () => {
    const params = {
      name: 'TestObject',
      abstract: false,
      embedded: false,
      parent: 'Object',
      parentFields,
      fields,
    }
    const expected = codeBlock`
      input TestObjectFilter {
        or: [TestObjectFilter!]
        and: [TestObjectFilter!]
        ${parentFields}
        ${fields}
      }
    `
    const definitions = generateFilterInputDefinitions({}, params)
    expect(definitions.length).toBe(1)
    expect(definitions[0]).toEqual(expected)
  })

  test('it should generate embedded filter input definitions', () => {
    const params = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
      parent: 'Object',
      parentFields: null,
      fields,
    }
    const expected = codeBlock`
      input EmbeddedFilter {
        or: [EmbeddedFilter!]
        and: [EmbeddedFilter!]
        ${fields}
      }
    `
    const definitions = generateFilterInputDefinitions({}, params)
    expect(definitions.length).toBe(1)
    expect(definitions[0]).toEqual(expected)
  })
})
