import { codeBlock } from 'common-tags'
import generatePayloadResolverDefinitions from './payloads'

const fields = [
  codeBlock`
    string: ({ string }, args, { baqendResolver }) => {
      return string
    }
  `,
  codeBlock`
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    }
  `,
]

describe('Generate object resolver definitions', () => {
  test('it should generate mutation payload resolver definitions', () => {
    const definitions = generatePayloadResolverDefinitions({}, {
      name: 'TestObject',
      fields,
    })
    const expected = [
      codeBlock`
        CreateTestObjectPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `, codeBlock`
        UpdateTestObjectPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate no object resolver when no field resolvers are present', () => {
    const definitions = generatePayloadResolverDefinitions({}, {
      name: 'TestEmbedded',
      fields: [],
    })
    const expected = []
    expect(definitions).toEqual(expected)
  })
})
