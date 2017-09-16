import { codeBlock } from 'common-tags'
import FieldType from '../../src/schema/types/FieldType'

describe('Create Scalar FieldType', () => {
  let fieldType = new FieldType({
    "name": "someString",
    "type": "/db/String"
  })

  test('has proper name', () => {
    expect(fieldType.name).toBe('someString')
  })
  test('has proper type', () => {
    expect(fieldType.type).toBe('String')
  })
  test('has proper superType', () => {
    expect(fieldType.superType).toBe('scalar')
  })

  test('returns proper Def', () => {
    let def = fieldType.getDef()
    let expectedDef = codeBlock`
      someString: String
    `
    expect(def).toEqual(expectedDef)
  })

  test('returns proper Resolver', () => {
    let resolverDef = fieldType.getResolverDef()
    let expectedResolverDef = codeBlock`
      someString: ({ someString }, args, { baqendResolver }) => {
        return someString
      }
    `
    expect(resolverDef).toEqual(expectedResolverDef)
  })
})

describe('Create Object FieldType', () => {
  let fieldType = new FieldType({
    "name": "someReference",
    "type": "/db/ReferenceClass"
  })

  test('has proper name', () => {
    expect(fieldType.name).toBe('someReference')
  })
  test('has proper type', () => {
    expect(fieldType.type).toBe('ReferenceClass')
  })
  test('has proper superType', () => {
    expect(fieldType.superType).toBe('object')
  })

  test('returns proper Def', () => {
    let def = fieldType.getDef()
    let expectedDef = codeBlock`
      someReference: ReferenceClass
    `
    expect(def).toEqual(expectedDef)
  })

  test('returns proper Resolver', () => {
    let resolverDef = fieldType.getResolverDef()
    let expectedResolverDef = codeBlock`
      someReference: ({ someReference }, args, { baqendResolver }) => {
        return baqendResolver.resolveReference('ReferenceClass', someReference, args, {})
      }
    `
    expect(resolverDef).toEqual(expectedResolverDef)
  })
})

describe('Create Collection FieldType', () => {
  let fieldType = new FieldType({
    "name": "referenceCollection",
    "type": "/db/collection.List[/db/ReferenceClass]"
  })

  test('has proper name', () => {
    expect(fieldType.name).toBe('referenceCollection')
  })
  test('has proper type', () => {
    expect(fieldType.type).toBe('ReferenceClass')
  })
  test('has proper superType', () => {
    expect(fieldType.superType).toBe('collection')
  })

  test('returns proper Def', () => {
    let def = fieldType.getDef()
    let expectedDef = codeBlock`
      referenceCollection: [ReferenceClass]
    `
    expect(def).toEqual(expectedDef)
  })

  test('returns proper Resolver', () => {
    let resolverDef = fieldType.getResolverDef()
    let expectedResolverDef = codeBlock`
      referenceCollection: ({ referenceCollection }, args, { baqendResolver }) => {
        return baqendResolver.resolveReferenceCollection('ReferenceClass', referenceCollection, args, {})
      }
    `
    expect(resolverDef).toEqual(expectedResolverDef)
  })
})
