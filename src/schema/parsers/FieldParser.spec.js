import FieldParser from './FieldParser'

const types = {
  reference: [
    'Role',
    'Test',
    'TestReference',
    'Device',
    'Reference',
    'User',
    'Post',
    'Comment',
    'Object',
  ],
  embedded: [
    'Embedded',
  ],
}

// const testFields = [
//   { name: 'double', type: 'Double' },
//   { name: 'integer', type: 'Integer' },
//   { name: 'boolean', type: 'Boolean' },
//   { name: 'datetime', type: 'DateTime' },
//   { name: 'date', type: 'Date' },
//   { name: 'time', type: 'Time' },
//   { name: 'array', type: 'JsonArray' },
//   { name: 'json', type: 'JsonObject' },
//   { name: 'reference', type: 'TestReference' },
//   { name: 'embedded', type: 'Embedded' },
//   { name: 'referenceList', type: 'collection.List[/db/TestReference]' },
//   { name: 'referenceSet', type: 'collection.Set[/db/TestReference]' },
//   { name: 'referenceMap', type: 'collection.Map[/db/String,/db/TestReference]' },
//   { name: 'stringList', type: 'collection.List[/db/String]' },
//   { name: 'stringSet', type: 'collection.Set[/db/String]' },
//   { name: 'stringMap', type: 'collection.Map[/db/String,/db/String]' },
//   { name: 'embeddedList', type: 'collection.List[/db/Embedded]' },
//   { name: 'embeddedMap', type: 'collection.Map[/db/String,/db/Embedded]' },
//   { name: 'refRefMap', type: 'collection.Map[/db/TestReference,/db/TestReference]' },
// ]

describe('it should parse field types correctly', () => {
  test('parse string field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'string',
      type: 'String',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'String',
      fieldType: 'scalar',
      name: 'string',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse double field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'double',
      type: 'Double',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Float',
      fieldType: 'scalar',
      name: 'double',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse integer field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'integer',
      type: 'Integer',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Int',
      fieldType: 'scalar',
      name: 'integer',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse boolean field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'boolean',
      type: 'Boolean',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Boolean',
      fieldType: 'scalar',
      name: 'boolean',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse datetime field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'datetime',
      type: 'DateTime',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Date',
      fieldType: 'scalar',
      name: 'datetime',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse date field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'date',
      type: 'Date',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Date',
      fieldType: 'scalar',
      name: 'date',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse time field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'time',
      type: 'Time',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Date',
      fieldType: 'scalar',
      name: 'time',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse array field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'array',
      type: 'JsonArray',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'JSON',
      fieldType: 'scalar',
      name: 'array',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse json field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'json',
      type: 'JsonObject',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'JSON',
      fieldType: 'scalar',
      name: 'json',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse reference field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'reference',
      type: 'TestReference',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'TestReference',
      fieldType: 'reference',
      name: 'reference',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse embedded field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'embedded',
      type: 'Embedded',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: 'Embedded',
      fieldType: 'embedded',
      name: 'embedded',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse reference list field', () => {
    const fieldParser = new FieldParser(types)
    const field = { name: 'referenceList', type: 'collection.List[/db/TestReference]' }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'List',
        types: [
          {
            elementType: 'TestReference',
            fieldType: 'reference',
          },
        ],
      },
      fieldType: 'collection',
      name: 'referenceList',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse reference set field', () => {
    const fieldParser = new FieldParser(types)
    const field = { name: 'referenceSet', type: 'collection.Set[/db/TestReference]' }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'Set',
        types: [
          {
            elementType: 'TestReference',
            fieldType: 'reference',
          },
        ],
      },
      fieldType: 'collection',
      name: 'referenceSet',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse string x reference map field', () => {
    const fieldParser = new FieldParser(types)
    const field = { name: 'referenceMap', type: 'collection.Map[/db/String,/db/TestReference]' }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'Map',
        types: [
          {
            elementType: 'String',
            fieldType: 'scalar',
          },
          {
            elementType: 'TestReference',
            fieldType: 'reference',
          },
        ],
      },
      fieldType: 'collection',
      name: 'referenceMap',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse string list field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'stringList',
      type: 'collection.List[/db/String]',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'List',
        types: [
          {
            elementType: 'String',
            fieldType: 'scalar',
          },
        ],
      },
      fieldType: 'collection',
      name: 'stringList',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse string set field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'stringSet',
      type: 'collection.Set[/db/String]',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'Set',
        types: [
          {
            elementType: 'String',
            fieldType: 'scalar',
          },
        ],
      },
      fieldType: 'collection',
      name: 'stringSet',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse string map field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'stringMap',
      type: 'collection.Map[/db/String,/db/String]',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'Map',
        types: [
          {
            elementType: 'String',
            fieldType: 'scalar',
          },
          {
            elementType: 'String',
            fieldType: 'scalar',
          },
        ],
      },
      fieldType: 'collection',
      name: 'stringMap',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse embedded list field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'embeddedList',
      type: 'collection.List[/db/Embedded]',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'List',
        types: [
          {
            elementType: 'Embedded',
            fieldType: 'embedded',
          },
        ],
      },
      fieldType: 'collection',
      name: 'embeddedList',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse string x embedded map field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'embeddedMap',
      type: 'collection.Map[/db/String,/db/Embedded]',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'Map',
        types: [
          {
            elementType: 'String',
            fieldType: 'scalar',
          },
          {
            elementType: 'Embedded',
            fieldType: 'embedded',
          },
        ],
      },
      fieldType: 'collection',
      name: 'embeddedMap',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })

  test('parse reference x reference map field', () => {
    const fieldParser = new FieldParser(types)
    const field = {
      name: 'refRefMap',
      type: 'collection.Map[/db/TestReference,/db/TestReference]',
    }
    const fieldParsed = fieldParser.parseField(field)
    const expected = {
      elementType: {
        collectionType: 'Map',
        types: [
          {
            elementType: 'TestReference',
            fieldType: 'reference',
          },
          {
            elementType: 'TestReference',
            fieldType: 'reference',
          },
        ],
      },
      fieldType: 'collection',
      name: 'refRefMap',
      readOnly: false,
    }
    expect(fieldParsed).toEqual(expected)
  })
})
