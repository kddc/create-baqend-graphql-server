import { codeBlock } from 'common-tags'
import generateFieldInputDefinitions from './inputs'

describe('Generate field input definition', () => {
  test('it should generate a string input definition', () => {
    const params = {
      name: 'string',
      fieldType: 'scalar',
      elementType: 'String',
    }
    const expected = codeBlock`
      string: String
    `
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a float input definition', () => {
    const params = {
      name: 'double',
      fieldType: 'scalar',
      elementType: 'Float',
    }
    const expected = codeBlock`
      double: Float
    `
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a integer input definition', () => {
    const params = {
      name: 'integer',
      fieldType: 'scalar',
      elementType: 'Int',
    }
    const expected = codeBlock`
      integer: Int
    `
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a boolean input definition', () => {
    const params = {
      name: 'boolean',
      fieldType: 'scalar',
      elementType: 'Boolean',
    }
    const expected = codeBlock`
      boolean: Boolean
    `
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a date input definition', () => {
    const params = {
      name: 'datetime',
      fieldType: 'scalar',
      elementType: 'Date',
    }
    const expected = codeBlock`
      datetime: Date
    `
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a json input definition', () => {
    const params = {
      name: 'array',
      fieldType: 'scalar',
      elementType: 'JSON',
    }
    const expected = codeBlock`
      array: JSON
    `
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference input definition', () => {
    const params = {
      name: 'reference',
      fieldType: 'reference',
      elementType: 'TestReference',
    }
    const expected = [
      codeBlock`
        referenceId: ID
      `,
      codeBlock`
        reference: TestReferenceInput
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(2)
    expect(definition[0]).toEqual(expected[0])
    expect(definition[1]).toEqual(expected[1])
  })

  test('it should generate a embedded input definition', () => {
    const params = {
      name: 'embedded',
      fieldType: 'embedded',
      elementType: 'Embedded',
    }
    const expected = [
      codeBlock`
        embedded: EmbeddedInput
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected[0])
  })

  test('it should generate a reference list input definition', () => {
    const params = {
      name: 'referenceList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'reference', elementType: 'TestReference' }],
      },
    }
    const expected = [
      codeBlock`
        referenceListIds: [ID!]
      `,
      codeBlock`
        referenceList: [TestReferenceInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(2)
    expect(definition[0]).toEqual(expected[0])
    expect(definition[1]).toEqual(expected[1])
  })

  test('it should generate a scalar list input definition', () => {
    const params = {
      name: 'stringList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'scalar', elementType: 'String' }],
      },
    }
    const expected = [
      codeBlock`
        stringList: [String!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected[0])
  })

  test('it should generate a embedded list input definition', () => {
    const params = {
      name: 'embeddedList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'embedded', elementType: 'Embedded' }],
      },
    }
    const expected = [
      codeBlock`
        embeddedList: [EmbeddedInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected[0])
  })

  test('it should generate a reference set input definition', () => {
    const params = {
      name: 'referenceSet',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Set',
        types: [{ fieldType: 'reference', elementType: 'TestReference' }],
      },
    }
    const expected = [
      codeBlock`
        referenceSetIds: [ID!]
      `,
      codeBlock`
        referenceSet: [TestReferenceInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(2)
    expect(definition[0]).toEqual(expected[0])
    expect(definition[1]).toEqual(expected[1])
  })

  test('it should generate a string set input definition', () => {
    const params = {
      name: 'stringSet',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Set',
        types: [{ fieldType: 'scalar', elementType: 'String' }],
      },
    }
    const expected = [
      codeBlock`
        stringSet: [String!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected[0])
  })

  test('it should generate a scalar X reference map input definition', () => {
    const params = {
      name: 'referenceMap',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Map',
        types: [
          { fieldType: 'scalar', elementType: 'String' },
          { fieldType: 'reference', elementType: 'TestReference' },
        ],
      },
    }
    const expected = [
      codeBlock`
        referenceMapIds: [StringTestReferenceMapInputIds!]
      `,
      codeBlock`
        referenceMap: [StringTestReferenceMapInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(2)
    expect(definition[0]).toEqual(expected[0])
    expect(definition[1]).toEqual(expected[1])
  })

  test('it should generate a scalar X scalar map input definition', () => {
    const params = {
      name: 'stringMap',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Map',
        types: [
          { fieldType: 'scalar', elementType: 'String' },
          { fieldType: 'scalar', elementType: 'String' },
        ],
      },
    }
    const expected = [
      codeBlock`
        stringMap: [StringStringMapInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected[0])
  })

  test('it should generate a scalar X scalar map input definition', () => {
    const params = {
      name: 'embeddedMap',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Map',
        types: [
          { fieldType: 'scalar', elementType: 'String' },
          { fieldType: 'embedded', elementType: 'Embedded' },
        ],
      },
    }
    const expected = [
      codeBlock`
        embeddedMap: [StringEmbeddedMapInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(1)
    expect(definition[0]).toEqual(expected[0])
  })

  test('it should generate a scalar X scalar map input definition', () => {
    const params = {
      name: 'refRefMap',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Map',
        types: [
          { fieldType: 'reference', elementType: 'TestReference' },
          { fieldType: 'reference', elementType: 'TestReference' },
        ],
      },
    }
    const expected = [
      codeBlock`
        refRefMapIds: [TestReferenceTestReferenceMapInputIds!]
      `,
      codeBlock`
        refRefMap: [TestReferenceTestReferenceMapInput!]
      `,
    ]
    const definition = generateFieldInputDefinitions({}, params)
    expect(definition.length).toBe(2)
    expect(definition[0]).toEqual(expected[0])
    expect(definition[1]).toEqual(expected[1])
  })
})
