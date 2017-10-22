import { codeBlock } from 'common-tags'
import generateConnectionInputDefinitions, { generateConnectionInputDefinition } from './inputs'

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

describe('Generate object connection input definitions', () => {
  test('it should generate no connection type definitions for abstract or embedded types', () => {
    const expected = []
    const abstractDefinitions = generateConnectionInputDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(expected)

    const embeddedDefinitions = generateConnectionInputDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(expected)
  })

  test('it should generate connection input definitions for reference list or set', () => {
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
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.referenceList,
    })
    const expected = [
      codeBlock`
        input AddTestReferenceToTestObjectReferenceListInput {
          clientMutationId: String!
          id: ID!
          referenceListEntryId: ID
          referenceListEntry: TestReferenceInput
        }
      `,
      codeBlock`
        input RemoveTestReferenceFromTestObjectReferenceListInput {
          clientMutationId: String!
          id: ID!
          referenceListEntryId: ID
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for string list or set', () => {
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
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.stringList,
    })
    const expected = [
      codeBlock`
        input AddStringToTestObjectStringListInput {
          clientMutationId: String!
          id: ID!
          stringListEntry: String
        }
      `,
      codeBlock`
        input RemoveStringFromTestObjectStringListInput {
          clientMutationId: String!
          id: ID!
          stringListEntry: String
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for embedded list', () => {
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
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.embeddedList,
    })
    const expected = [
      codeBlock`
        input AddEmbeddedToTestObjectEmbeddedListInput {
          clientMutationId: String!
          id: ID!
          embeddedListEntry: EmbeddedInput
        }
      `,
      codeBlock`
        input RemoveEmbeddedFromTestObjectEmbeddedListInput {
          clientMutationId: String!
          id: ID!
          embeddedListEntry: EmbeddedInput
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for scalar X reference map', () => {
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
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.referenceMap,
    })
    const expected = [
      codeBlock`
        input AddEntryToTestObjectReferenceMapInput {
          clientMutationId: String!
          id: ID!
          referenceMapEntryIds: StringTestReferenceMapInputIds
          referenceMapEntry: StringTestReferenceMapInput
        }
      `,
      codeBlock`
        input RemoveEntryFromTestObjectReferenceMapInput {
          clientMutationId: String!
          id: ID!
          referenceMapEntryIds: StringTestReferenceMapInputIds
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for scalar x scalar map', () => {
    // stringMap: {
    //   name: 'stringMap',
    //   collectionType: 'Map',
    //   types: [
    //     {
    //       fieldType: 'scalar',
    //       elementType: 'String',
    //     },
    //     {
    //       fieldType: 'scalar',
    //       elementType: 'String',
    //     },
    //   ],
    // },
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.stringMap,
    })
    const expected = [
      codeBlock`
        input AddEntryToTestObjectStringMapInput {
          clientMutationId: String!
          id: ID!
          stringMapEntry: StringStringMapInput
        }
      `,
      codeBlock`
        input RemoveEntryFromTestObjectStringMapInput {
          clientMutationId: String!
          id: ID!
          stringMapEntry: StringStringMapInput
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for scalar x embedded map', () => {
    // embeddedMap: {
    //   name: 'embeddedMap',
    //   collectionType: 'Map',
    //   types: [
    //     {
    //       fieldType: 'scalar',
    //       elementType: 'String',
    //     },
    //     {
    //       fieldType: 'embedded',
    //       elementType: 'Embedded',
    //     },
    //   ],
    // },
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.embeddedMap,
    })
    const expected = [
      codeBlock`
        input AddEntryToTestObjectEmbeddedMapInput {
          clientMutationId: String!
          id: ID!
          embeddedMapEntry: StringEmbeddedMapInput
        }
      `,
      codeBlock`
        input RemoveEntryFromTestObjectEmbeddedMapInput {
          clientMutationId: String!
          id: ID!
          embeddedMapEntry: StringEmbeddedMapInput
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for reference x reference map', () => {
    // refRefMap: {
    //   name: 'refRefMap',
    //   collectionType: 'Map',
    //   types: [
    //     {
    //       fieldType: 'reference',
    //       elementType: 'TestReference',
    //     },
    //     {
    //       fieldType: 'reference',
    //       elementType: 'TestReference',
    //     },
    //   ],
    // },
    const definitions = generateConnectionInputDefinition({}, {
      name: 'TestObject',
      connection: connections.refRefMap,
    })
    const expected = [
      codeBlock`
        input AddEntryToTestObjectRefRefMapInput {
          clientMutationId: String!
          id: ID!
          refRefMapEntryIds: TestReferenceTestReferenceMapInputIds
          refRefMapEntry: TestReferenceTestReferenceMapInput
        }
      `,
      codeBlock`
        input RemoveEntryFromTestObjectRefRefMapInput {
          clientMutationId: String!
          id: ID!
          refRefMapEntryIds: TestReferenceTestReferenceMapInputIds
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
