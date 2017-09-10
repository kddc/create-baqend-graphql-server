import { codeBlock } from 'common-tags'
import generateObjectTypeDefs from './generateObjectTypeDefs'

let objectTypes = [
  {
    name: 'TestObject',
    fields: [
      { name: 'string', superType: 'scalar', type: 'String' },
      { name: 'reference', superType: 'object', type: 'ReferenceClass' },
      { name: 'referenceCollection', superType: 'collection', type: 'ReferenceClass' }
    ]
  }
]

let expectedObjectTypeDefs = codeBlock`
  type TestObject {
    string: String
    reference: ReferenceClass
    referenceCollection: [ReferenceClass]
  }
`

describe('create objectTypeDefs from objectTypes', () => {
  let objectTypeDefs = generateObjectTypeDefs(objectTypes)
  test('objectTypeDefs equal expectedObjectTypeDefs', () => {
    expect(objectTypeDefs).toEqual(expectedObjectTypeDefs)
  })
})
