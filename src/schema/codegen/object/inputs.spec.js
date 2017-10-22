import { codeBlock } from 'common-tags'
import generateInputDefinitions from './inputs'

const parentFields = ['id: ID!']
const fields = ['string: String']

describe('Generate object type definition', () => {
  test('it should generate no input definitions for abstract (interface) types', () => {
    const params = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields,
      fields,
    }
    const expected = []
    const definitions = generateInputDefinitions({}, params)
    expect(definitions.length).toBe(0)
    expect(definitions).toEqual(expected)
  })

  test('it should generate an input type for embedded types', () => {
    const params = {
      name: 'TestEmbedded',
      abstract: false,
      embedded: true,
      parent: null,
      parentFields: [],
      fields,
    }
    const expected = codeBlock`
      input TestEmbeddedInput {
        string: String
      }
    `
    const definitions = generateInputDefinitions({}, params)
    expect(definitions.length).toBe(1)
    expect(definitions[0]).toEqual(expected)
  })

  test('it should generate input (Input, Create, Update, Delete) type definitions', () => {
    const params = {
      name: 'TestObject',
      abstract: false,
      embedded: false,
      parent: 'Object',
      fields,
    }
    const expected = [
      codeBlock`
        input TestObjectInput {
          id: ID
          string: String
        }
      `,
      codeBlock`
        input CreateTestObjectInput {
          clientMutationId: String!
          id: ID
          string: String
        }
      `,
      codeBlock`
        input UpdateTestObjectInput {
          clientMutationId: String!
          id: ID!
          string: String
        }
      `,
      codeBlock`
        input DeleteTestObjectInput {
          clientMutationId: String!
          id: ID!
        }
      `,
    ]
    const definitions = generateInputDefinitions({}, params)
    expect(definitions.length).toBe(4)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
    expect(definitions[2]).toEqual(expected[2])
    expect(definitions[3]).toEqual(expected[3])
  })
})
