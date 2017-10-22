import { codeBlock } from 'common-tags'
import generateConnectionTypeDefinitions from './connections'

const parentFields = ['id: ID!']
const fields = ['string: String']

describe('Generate object connection type definitions', () => {
  test('it should generate no connection type definitions for abstract types', () => {
    const params = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields,
      fields,
    }
    const expected = []
    const definitions = generateConnectionTypeDefinitions({}, params)
    expect(definitions.length).toBe(0)
    expect(definitions).toEqual(expected)
  })
  test('it should generate object connection type definitions', () => {
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
        type TestObjectConnection {
          total: Int
          edges: [TestObjectEdge]
          pageInfo: PageInfo!
        }
      `,
      codeBlock`
        type TestObjectEdge {
          cursor: String!
          node: TestObject
        }
      `,
    ]
    const definitions = generateConnectionTypeDefinitions({}, params)
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
