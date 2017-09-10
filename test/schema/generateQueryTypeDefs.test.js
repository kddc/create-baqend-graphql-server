import { codeBlock } from 'common-tags'
import { generateQueryTypeDefs } from '../../src/schema/codegen/types'

let queryTypes = [
  {
    name: 'TestObject',
    args: [],
    type: 'TestObject',
    superType: 'object'
  },
  {
    name: 'allTestObjects',
    args: [],
    type: 'TestObject',
    superType: 'collection'
  }
]

let expectedQueryTypeDefs = codeBlock`
  type Query {
    TestObject: TestObject
    allTestObjects: [TestObject]
  }
`

describe('create queryTypeDefs from queryTypes', () => {
  let queryTypeDefs = generateQueryTypeDefs(queryTypes)
  test('queryTypeDefs equal expectedQueryTypeDefs', () => {
    expect(queryTypeDefs).toEqual(expectedQueryTypeDefs)
  })
})
