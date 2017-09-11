import { codeBlock } from 'common-tags'
import ObjectType from '../../src/schema/types/ObjectType'

let schemaObject = {
  "class": "/db/TestObject",
  "superClass": "/db/Object",
  "fields": [
    {
      "name": "string",
      "type": "/db/String"
    },
    {
      "name": "reference",
      "type": "/db/ReferenceClass"
    },
    {
      "name": "referenceCollection",
      "type": "/db/collection.List[/db/ReferenceClass]"
    }
  ]
}

describe('Create ObjectType', () => {
  let objectType = new ObjectType(schemaObject)

  test('has proper name', () => {
    expect(objectType.name).toBe('TestObject')
  })

  test('has proper fields', () => {
    expect(objectType.fields).toHaveLength(3)
  })

  test('has proper queryTypes', () => {
    expect(objectType.queryTypes.types).toHaveLength(2)
  })

  test('returns proper Def', () => {
    let typeDef = objectType.getTypeDef()
    let fields = objectType.fields
    let expectedDef = codeBlock`
      type TestObject {
        ${fields.map((field) => field.getDef())}
      }
    `
    expect(typeDef).toEqual(expectedDef)
  })

  test('returns proper Resolver', () => {
    let resolverDef = objectType.getResolverDef()
    let fields = objectType.fields.filter((field) => {
      return (field.superType === 'object' || field.superType === 'collection')
    })
    let expectedResolverDef = codeBlock`
      TestObject: {
        ${fields.map((field) => {
          return field.getResolverDef()
        }).join('\n')}
      }
    `
    expect(resolverDef).toEqual(expectedResolverDef)
  })

})
