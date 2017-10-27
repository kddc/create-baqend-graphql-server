import { codeBlock } from 'common-tags'
import generateFieldTypeDefinitions from './type'

describe('Generate field type definition', () => {
  test('it should generate a id type definition', () => {
    const params = {
      name: 'id',
      fieldType: 'scalar',
      elementType: 'ID',
    }
    const expected = codeBlock`
      id: ID!
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar type definition', () => {
    const params = {
      name: 'string',
      fieldType: 'scalar',
      elementType: 'String',
    }
    const expected = codeBlock`
      string: String
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference type definition', () => {
    const params = {
      name: 'reference',
      fieldType: 'reference',
      elementType: 'TestReference',
    }
    const expected = codeBlock`
      reference: TestReference
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a embedded type definition', () => {
    const params = {
      name: 'embedded',
      fieldType: 'embedded',
      elementType: 'Embedded',
    }
    const expected = codeBlock`
      embedded: Embedded
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference list type definition', () => {
    const params = {
      name: 'referenceList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'reference', elementType: 'TestReference' }],
      },
    }
    const expected = codeBlock`
      referenceList(first: Int, after: String, last: Int, before: String): TestReferenceConnection
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar list type definition', () => {
    const params = {
      name: 'stringList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'scalar', elementType: 'String' }],
      },
    }
    const expected = codeBlock`
      stringList(first: Int, after: String, last: Int, before: String): StringConnection
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a embedded list type definition', () => {
    const params = {
      name: 'embeddedList',
      fieldType: 'collection',
      elementType: {
        collectionType: 'List',
        types: [{ fieldType: 'embedded', elementType: 'Embedded' }],
      },
    }
    const expected = codeBlock`
      embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference set type definition', () => {
    const params = {
      name: 'referenceSet',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Set',
        types: [{ fieldType: 'reference', elementType: 'TestReference' }],
      },
    }
    const expected = codeBlock`
      referenceSet: [TestReference]
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar set type definition', () => {
    const params = {
      name: 'stringSet',
      fieldType: 'collection',
      elementType: {
        collectionType: 'Set',
        types: [{ fieldType: 'scalar', elementType: 'String' }],
      },
    }
    const expected = codeBlock`
      stringSet: [String]
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar X reference map type definition', () => {
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
    const expected = codeBlock`
      referenceMap: [StringTestReferenceMapEntry]
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar X scalar map type definition', () => {
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
    const expected = codeBlock`
      stringMap: [StringStringMapEntry]
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a scalar X embedded map type definition', () => {
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
    const expected = codeBlock`
      embeddedMap: [StringEmbeddedMapEntry]
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference X reference map type definition', () => {
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
    const expected = codeBlock`
      refRefMap: [TestReferenceTestReferenceMapEntry]
    `
    const definition = generateFieldTypeDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })
})
