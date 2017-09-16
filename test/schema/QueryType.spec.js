import { codeBlock } from 'common-tags'
import QueryType from '../../src/schema/types/QueryType'

describe('Create Object QueryType', () => {
  let name = 'TestObject'
  let type = 'TestObject'
  let args = [
    { name: 'id', type: 'String' }
  ]
  let queryType = new QueryType({
    name: name,
    args: args,
    type: type,
    superType: 'object'
  })

  test('has proper name', () => {
    expect(queryType.name).toBe('TestObject')
  })
  test('has proper type', () => {
    expect(queryType.type).toBe('TestObject')
  })
  test('has proper superType', () => {
    expect(queryType.superType).toBe('object')
  })

  test('returns proper Def', () => {
    let typeDef = queryType.getTypeDef()
    let expectedDef = codeBlock`
      TestObject: TestObject
    `
    expect(typeDef).toEqual(expectedDef)
  })

  test('returns proper Resolver', () => {
    let resolverDef = queryType.getResolverDef()
    let expectedResolverDef = codeBlock`
      TestObject: (root, args, { baqendResolver }) => {
        return baqendResolver.resolveReferenceQuery('TestObject', args, {})
      }
    `
    expect(resolverDef).toEqual(expectedResolverDef)
  })
})

describe('Create Collection QueryType', () => {
  let name = 'allTestObjects'
  let type = 'TestObject'
  let args = [
    { name: 'first', type: 'Integer' },
    { name: 'last', type: 'Integer' }
  ]
  let queryType = new QueryType({
    name: name,
    args: args,
    type: type,
    superType: 'collection'
  })

  test('has proper name', () => {
    expect(queryType.name).toBe('allTestObjects')
  })
  test('has proper type', () => {
    expect(queryType.type).toBe('TestObject')
  })
  test('has proper superType', () => {
    expect(queryType.superType).toBe('collection')
  })

  test('returns proper Def', () => {
    let typeDef = queryType.getTypeDef()
    let expectedDef = codeBlock`
      allTestObjects: [TestObject]
    `
    expect(typeDef).toEqual(expectedDef)
  })

  test('returns proper Resolver', () => {
    let resolverDef = queryType.getResolverDef()
    let expectedResolverDef = codeBlock`
      allTestObjects: (root, args, { baqendResolver }) => {
        return baqendResolver.resolveCollectionQuery('TestObject', args, {})
      }
    `
    expect(resolverDef).toEqual(expectedResolverDef)
  })
})
