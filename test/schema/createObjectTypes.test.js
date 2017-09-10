import { createObjectTypes } from '../../src/schema/factories/types'
let schema = [
  {
    "class": "/db/TestClass",
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
]

let expectedObjectTypes = [
  {
    name: 'TestClass',
    fields: [
      { name: 'string', superType: 'scalar', type: 'String' },
      { name: 'reference', superType: 'object', type: 'ReferenceClass' },
      { name: 'referenceCollection', superType: 'collection', type: 'ReferenceClass' }
    ]
  }
]

describe('create objectTypes from schema', () => {
  let objectTypes = createObjectTypes(schema)
  let objectType = objectTypes[0]
  test('objectTypes is array', () => {
    expect(Array.isArray(objectTypes)).toBeTruthy()
  })

  test('objectTypes has correct length', () => {
    expect(objectTypes).toHaveLength(1)
  })

  test('objectTypes equal expectedObjectTypes', () => {
    expect(objectTypes).toEqual(expectedObjectTypes)
  })

  test('objectType has correct properties', () => {
    expect(objectType).toEqual(expect.objectContaining({
      name: expect.any(String),
      fields: expect.any(Object)
    }))
  })

  test('objectType has correct name', () => {
    expect(objectType.name).toBe('TestClass')
  })

  test('objectType fields array has correct length', () => {
    expect(objectType.fields).toHaveLength(3)
  })

  test('fields have correct properties', () => {
    objectType.fields.forEach((field) => {
      expect(field).toEqual(expect.objectContaining({
        name: expect.any(String),
        superType: expect.any(String),
        type: expect.any(String)
      }))
    })
  })

  test('field 0 has correct values', () => {
    expect(objectType.fields[0].name).toBe('string')
    expect(objectType.fields[0].superType).toBe('scalar')
    expect(objectType.fields[0].type).toBe('String')
  })

  test('field 1 has correct values', () => {
    expect(objectType.fields[1].name).toBe('reference')
    expect(objectType.fields[1].superType).toBe('object')
    expect(objectType.fields[1].type).toBe('ReferenceClass')
  })

  test('field 2 has correct values', () => {
    expect(objectType.fields[2].name).toBe('referenceCollection')
    expect(objectType.fields[2].superType).toBe('collection')
    expect(objectType.fields[2].type).toBe('ReferenceClass')
  })

})
