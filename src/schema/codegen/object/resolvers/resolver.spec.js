import { codeBlock } from 'common-tags'
import generateResolverDefinitions from './resolver'

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
  test('it should generate object resolver definitions', () => {
    const definitions = generateResolverDefinitions({}, {
      name: 'TestObject',
      fields,
    })
    const expected = codeBlock`
      TestObject: {
        string: ({ string }, args, { baqendResolver }) => {
          return string
        },
        embedded: ({ embedded }, args, { baqendResolver }) => {
          return embedded
        }
      }
    `
    expect(definitions[0]).toEqual(expected)
  })

  test('it should generate no object resolver when no field resolvers are present', () => {
    const definitions = generateResolverDefinitions({}, {
      name: 'TestEmbedded',
      fields: [],
    })
    const expected = []
    expect(definitions).toEqual(expected)
  })
})
