import { codeBlock } from 'common-tags'
import generatePayloadDefinitions from './payloads'

const parentFields = ['id: ID!']
const fields = ['string: String']

describe('Generate payload definitions', () => {
  test('it should generate no payload definitions for abstract or embedded types', () => {
    const expected = []
    const abstractDefinitions = generatePayloadDefinitions({}, {
      name: 'TestEmbedded',
      abstract: false,
      embedded: true,
      parent: null,
      parentFields: [],
      fields,
    })
    expect(abstractDefinitions).toEqual(expected)

    const embeddedDefinitions = generatePayloadDefinitions({}, {
      name: 'TestInterface',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields: [],
      fields: parentFields,
    })
    expect(embeddedDefinitions).toEqual(expected)
  })

  test('it should generate payload definitions', () => {
    const definitions = generatePayloadDefinitions({}, {
      name: 'TestObject',
      abstract: false,
      embedded: false,
      parent: 'Object',
      parentFields,
      fields,
    })
    const expected = [
      codeBlock`
        type CreateTestObjectPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `, codeBlock`
        type UpdateTestObjectPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `, codeBlock`
        type DeleteTestObjectPayload {
          clientMutationId: String!
          id: ID!
        }
      `,
    ]
    expect(definitions.length).toBe(3)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
    expect(definitions[2]).toEqual(expected[2])
  })
})
