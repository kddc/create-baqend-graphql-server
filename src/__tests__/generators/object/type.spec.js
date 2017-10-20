import { codeBlock } from 'common-tags'
import generateObjectTypeDefinitions from '../../../schema/codegen/object/type'

const parentFields = ['id: ID!']
const fields = ['string: String']

describe('Generate object type definition', () => {
  test('it should generate a object type', () => {
    const expected = codeBlock`
      type TestObject implements Node, Object {
        id: ID!
        string: String
      }
    `
    const definition = generateObjectTypeDefinitions({}, {
      name: 'TestObject',
      abstract: false,
      embedded: false,
      parent: 'Object',
      parentFields,
      fields,
    })
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a embedded type', () => {
    const expected = codeBlock`
      type TestEmbedded {
        string: String
      }
    `
    const definition = generateObjectTypeDefinitions({}, {
      name: 'TestEmbedded',
      abstract: false,
      embedded: true,
      parent: null,
      parentFields: [],
      fields,
    })
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a abstract (interface) type', () => {
    const expected = codeBlock`
      interface TestInterface {
        id: ID!
      }
    `
    const definition = generateObjectTypeDefinitions({}, {
      name: 'TestInterface',
      abstract: true,
      embedded: false,
      parent: null,
      parentFields: [],
      fields: parentFields,
    })
    expect(definition[0]).toEqual(expected)
  })
})
