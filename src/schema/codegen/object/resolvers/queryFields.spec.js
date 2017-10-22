import { codeBlock } from 'common-tags'
import generateQueryFieldResolverDefinitions from './queryFields'

const parentFields = ['id: IDFilter']
const fields = ['string: StringFilter']

describe('Generate object query field definitions', () => {
  test('it should generate no query fields definitions for abstract or embedded types', () => {
    const abstractParams = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
    }
    const abstractExpected = []
    const abstractDefinitions = generateQueryFieldResolverDefinitions({}, abstractParams)
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(abstractExpected)

    const embeddedParams = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
    }
    const embeddedExpected = []
    const embeddedDefinitions = generateQueryFieldResolverDefinitions({}, embeddedParams)
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(embeddedExpected)
  })

  test('it should generate query fields definitions for object types', () => {
    const params = {
      name: 'TestObject',
      abstract: false,
      embedded: false,
    }
    const expected = [
      codeBlock`
        TestObject: (root, args, { baqendResolver }) => {
          return baqendResolver.resolveReferenceQuery('TestObject', args, {})
        }
      `, codeBlock`
        allTestObjects: (root, args, { baqendResolver }) => {
          return baqendResolver.resolveReferenceCollectionQuery('TestObject', args, {})
        }
      `,
    ]
    const definitions = generateQueryFieldResolverDefinitions({}, params)
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
