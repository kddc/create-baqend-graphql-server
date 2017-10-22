import { codeBlock } from 'common-tags'
import generateMutationFieldDefinitions from './mutationFields'


describe('Generate object query field definitions', () => {
  test('it should generate no mutation fields definitions for abstract or embedded types', () => {
    const abstractParams = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
    }
    const abstractExpected = []
    const abstractDefinitions = generateMutationFieldDefinitions({}, abstractParams)
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(abstractExpected)

    const embeddedParams = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
    }
    const embeddedExpected = []
    const embeddedDefinitions = generateMutationFieldDefinitions({}, embeddedParams)
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
        createTestObject(input: CreateTestObjectInput): CreateTestObjectPayload
      `, codeBlock`
        updateTestObject(input: UpdateTestObjectInput): UpdateTestObjectPayload
      `, codeBlock`
        deleteTestObject(input: DeleteTestObjectInput): DeleteTestObjectPayload
      `,
    ]
    const definitions = generateMutationFieldDefinitions({}, params)
    expect(definitions.length).toBe(3)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
