import { codeBlock } from 'common-tags'
import generateMutationFieldResolverDefinitions from './mutationFields'


describe('Generate object query field definitions', () => {
  test('it should generate no mutation fields definitions for abstract or embedded types', () => {
    const abstractParams = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
    }
    const abstractExpected = []
    const abstractDefinitions = generateMutationFieldResolverDefinitions({}, abstractParams)
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(abstractExpected)

    const embeddedParams = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
    }
    const embeddedExpected = []
    const embeddedDefinitions = generateMutationFieldResolverDefinitions({}, embeddedParams)
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
        createTestObject: (root, args, { baqendMutator }) => {
          return baqendMutator.createEntity('TestObject', args, {})
        }
      `, codeBlock`
        updateTestObject: (root, args, { baqendMutator }) => {
          return baqendMutator.updateEntity('TestObject', args, {})
        }
      `, codeBlock`
        deleteTestObject: (root, args, { baqendMutator }) => {
          return baqendMutator.deleteEntity('TestObject', args, {})
        }
      `,
    ]
    const definitions = generateMutationFieldResolverDefinitions({}, params)
    expect(definitions.length).toBe(3)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
    expect(definitions[2]).toEqual(expected[2])
  })
})
