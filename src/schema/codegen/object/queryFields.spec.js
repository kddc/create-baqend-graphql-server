import { codeBlock } from 'common-tags'
import generateQueryFieldDefinitions from './queryFields'

const parentFields = ['id: IDFilter']
const fields = ['string: StringFilter']

describe('Generate object query field definitions', () => {
  test('it should generate no query fields definitions for abstract or embedded types', () => {
    const abstractParams = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields,
      fields,
    }
    const abstractExpected = []
    const abstractDefinitions = generateQueryFieldDefinitions({}, abstractParams)
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(abstractExpected)

    const embeddedParams = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
      parent: 'Object',
      parentFields: null,
      fields,
    }
    const embeddedExpected = []
    const embeddedDefinitions = generateQueryFieldDefinitions({}, embeddedParams)
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(embeddedExpected)
  })

  test('it should generate query fields definitions for object types', () => {
    const params = {
      name: 'TestObject',
      abstract: false,
      embedded: false,
      parent: 'Object',
      parentFields,
      fields,
    }
    const expected = [
      codeBlock`
        TestObject(id: ID!): TestObject
      `, codeBlock`
        allTestObjects(filter: TestObjectFilter, sortBy: TestObjectSortBy, first: Int, after: String, last: Int, before: String): TestObjectConnection
      `,
    ]
    const definitions = generateQueryFieldDefinitions({}, params)
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
