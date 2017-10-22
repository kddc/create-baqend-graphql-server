import { codeBlock } from 'common-tags'
import generateConnectionResolverDefinitions from './connections'


describe('Generate connection resolver definitions', () => {
  test('it should generate no connection resolver definitions for abstract types', () => {
    const params = {
      name: 'TestObject',
      abstract: true,
    }
    const expected = []
    const definitions = generateConnectionResolverDefinitions({}, params)
    expect(definitions.length).toBe(0)
    expect(definitions).toEqual(expected)
  })
  test('it should generate object connection resolver definitions', () => {
    const params = {
      name: 'TestObject',
      abstract: false,
    }
    const expected = [
      codeBlock`
        TestObjectConnection: {
          edges: ({ edges }, args, { baqendResolver }) => {
            return edges
          },
          pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
            return pageInfo
          }
        }
      `,
      codeBlock`
        TestObjectEdge: {
          cursor: ({ cursor }, args, { baqendResolver }) => {
            return cursor
          },
          node: ({ node }, args, { baqendResolver }) => {
            return node
          }
        }
      `,
    ]
    const definitions = generateConnectionResolverDefinitions({}, params)
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
