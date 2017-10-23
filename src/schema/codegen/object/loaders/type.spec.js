import { codeBlock } from 'common-tags'
import generateLoaderDefinitions from './type'

describe('Generate object loader definitions', () => {
  test('it should generate no query fields definitions for abstract or embedded types', () => {
    const abstractParams = {
      name: 'TestObject',
      abstract: true,
      embedded: false,
    }
    const abstractExpected = []
    const abstractDefinitions = generateLoaderDefinitions({}, abstractParams)
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(abstractExpected)

    const embeddedParams = {
      name: 'Embedded',
      abstract: false,
      embedded: true,
    }
    const embeddedExpected = []
    const embeddedDefinitions = generateLoaderDefinitions({}, embeddedParams)
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(embeddedExpected)
  })

  test('it should generate a loader definition', () => {
    const definition = generateLoaderDefinitions({}, {
      name: 'TestObject',
      abstract: false,
      embedded: false,
    })
    const expected = codeBlock`
      TestObject: new DataLoader(keys => batchRequest(db, 'TestObject', keys))
    `
    expect(definition[0]).toEqual(expected)
  })
})
