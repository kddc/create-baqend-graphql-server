import { codeBlock } from 'common-tags'
import QueryType from '../../src/schema/types/QueryType'
import QueryTypes from '../../src/schema/types/QueryTypes'

describe('Create Object QueryType', () => {
  let queryTypes = new QueryTypes({
    name: 'TestObject',
    type: 'TestObject'
  })

  test('has proper types length', () => {
    expect(queryTypes.types).toHaveLength(2)
  })

  test('has proper queryTypes', () => {
    expect(queryTypes.types[0].name).toBe('TestObject')
    expect(queryTypes.types[1].name).toBe('allTestObjects')
  })

  test('returns proper typeDefs', () => {
    let typeDefs = queryTypes.getTypeDefs()
    expect(Array.isArray(typeDefs)).toBeTruthy()
    expect(typeDefs).toHaveLength(2)
  })

  test('returns proper resolverDefs', () => {
    let resolverDefs = queryTypes.getResolverDefs()
    expect(Array.isArray(resolverDefs)).toBeTruthy()
    expect(resolverDefs).toHaveLength(2)
  })
})
