import { codeBlock } from 'common-tags'
import generateConnectionPayloadResolverDefinitions, {
  generateConnectionPayloadResolverDefinition,
} from './payloads'

const fields = [
  codeBlock`
    string: ({ string }, args, { baqendResolver }) => {
      return string
    }
  `,
  codeBlock`
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    }
  `,
]
const connections = {
  referenceList: {
    name: 'referenceList',
    collectionType: 'List',
    types: [
      {
        fieldType: 'reference',
        elementType: 'TestReference',
      },
    ],
  },
  stringList: {
    name: 'stringList',
    collectionType: 'List',
    types: [
      {
        fieldType: 'scalar',
        elementType: 'String',
      },
    ],
  },
  embeddedList: {
    name: 'embeddedList',
    collectionType: 'List',
    types: [
      {
        fieldType: 'embedded',
        elementType: 'Embedded',
      },
    ],
  },
  referenceMap: {
    name: 'referenceMap',
    collectionType: 'Map',
    types: [
      {
        fieldType: 'scalar',
        elementType: 'String',
      },
      {
        fieldType: 'reference',
        elementType: 'TestReference',
      },
    ],
  },
  stringMap: {
    name: 'stringMap',
    collectionType: 'Map',
    types: [
      {
        fieldType: 'scalar',
        elementType: 'String',
      },
      {
        fieldType: 'scalar',
        elementType: 'String',
      },
    ],
  },
  embeddedMap: {
    name: 'embeddedMap',
    collectionType: 'Map',
    types: [
      {
        fieldType: 'scalar',
        elementType: 'String',
      },
      {
        fieldType: 'embedded',
        elementType: 'Embedded',
      },
    ],
  },
  refRefMap: {
    name: 'refRefMap',
    collectionType: 'Map',
    types: [
      {
        fieldType: 'reference',
        elementType: 'TestReference',
      },
      {
        fieldType: 'reference',
        elementType: 'TestReference',
      },
    ],
  },
}

describe('Generate object connection payload resolver definitions', () => {
  test('it should generate no connection payload resolver definitions for abstract or embedded types', () => {
    const expected = []
    const abstractDefinitions = generateConnectionPayloadResolverDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(expected)

    const embeddedDefinitions = generateConnectionPayloadResolverDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(expected)
  })

  test('it should generate connection payload resolver definitions for reference list or set', () => {
    // referenceList: {
    //   name: 'referenceList',
    //   collectionType: 'List',
    //   types: [
    //     {
    //       fieldType: 'reference',
    //       elementType: 'TestReference',
    //     },
    //   ],
    // },
    const definitions = generateConnectionPayloadResolverDefinition({}, {
      name: 'TestObject',
      fields,
      connection: connections.referenceList,
    })
    const expected = [
      codeBlock`
        AddTestReferenceToTestObjectReferenceListPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
      codeBlock`
        RemoveTestReferenceFromTestObjectReferenceListPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection payload resolver definitions for string list or set', () => {
    // stringList: {
    //   name: 'stringList',
    //   collectionType: 'List',
    //   types: [
    //     {
    //       fieldType: 'scalar',
    //       elementType: 'String',
    //     },
    //   ],
    // },
    const definitions = generateConnectionPayloadResolverDefinition({}, {
      name: 'TestObject',
      fields,
      connection: connections.stringList,
    })
    const expected = [
      codeBlock`
        AddStringToTestObjectStringListPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
      codeBlock`
        RemoveStringFromTestObjectStringListPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection payload resolver definitions for embedded list', () => {
    // embeddedList: {
    //   name: 'embeddedList',
    //   collectionType: 'List',
    //   types: [
    //     {
    //       fieldType: 'embedded',
    //       elementType: 'Embedded',
    //     },
    //   ],
    // },
    const definitions = generateConnectionPayloadResolverDefinition({}, {
      name: 'TestObject',
      fields,
      connection: connections.embeddedList,
    })
    const expected = [
      codeBlock`
        AddEmbeddedToTestObjectEmbeddedListPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
      codeBlock`
        RemoveEmbeddedFromTestObjectEmbeddedListPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection payload resolver definitions for map', () => {
    // referenceMap: {
    //   name: 'referenceMap',
    //   collectionType: 'Map',
    //   types: [
    //     {
    //       fieldType: 'scalar',
    //       elementType: 'String',
    //     },
    //     {
    //       fieldType: 'reference',
    //       elementType: 'TestReference',
    //     },
    //   ],
    // },
    const definitions = generateConnectionPayloadResolverDefinition({}, {
      name: 'TestObject',
      fields,
      connection: connections.referenceMap,
    })
    const expected = [
      codeBlock`
        AddEntryToTestObjectReferenceMapPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
      codeBlock`
        RemoveEntryFromTestObjectReferenceMapPayload: {
          string: ({ string }, args, { baqendResolver }) => {
            return string
          },
          embedded: ({ embedded }, args, { baqendResolver }) => {
            return embedded
          }
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
