import { codeBlock } from 'common-tags'
import generateFieldSortByInputDefinitions from './sortByInputs'

describe('Generate field sortBy input definitions', () => {
  test('it should generate a string filter input definition', () => {
    const params = {
      name: 'string',
      fieldType: 'scalar',
      elementType: 'String',
    }
    const expected = codeBlock`
      string: Direction
    `
    const definition = generateFieldSortByInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })
})
