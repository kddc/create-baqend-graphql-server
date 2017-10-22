import { codeBlock } from 'common-tags'
import generateConnectionPayloadDefinitions, { generateConnectionPayloadDefinition } from './payloads'

const parentFields = ['id: ID!']
const fields = ['string: String']
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
  test('it should generate no connection payload definitions for abstract or embedded types', () => {
    const expected = []
    const abstractDefinitions = generateConnectionPayloadDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(expected)

    const embeddedDefinitions = generateConnectionPayloadDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(expected)
  })

  test('it should generate connection payload definitions for reference list or set', () => {
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
    const definitions = generateConnectionPayloadDefinition({}, {
      name: 'TestObject',
      parentFields,
      fields,
      connection: connections.referenceList,
    })
    const expected = [
      codeBlock`
        type AddTestReferenceToTestObjectReferenceListPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `,
      codeBlock`
        type RemoveTestReferenceFromTestObjectReferenceListPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
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
    const definitions = generateConnectionPayloadDefinition({}, {
      name: 'TestObject',
      parentFields,
      fields,
      connection: connections.stringList,
    })
    const expected = [
      codeBlock`
        type AddStringToTestObjectStringListPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `,
      codeBlock`
        type RemoveStringFromTestObjectStringListPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
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
    const definitions = generateConnectionPayloadDefinition({}, {
      name: 'TestObject',
      parentFields,
      fields,
      connection: connections.embeddedList,
    })
    const expected = [
      codeBlock`
        type AddEmbeddedToTestObjectEmbeddedListPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `,
      codeBlock`
        type RemoveEmbeddedFromTestObjectEmbeddedListPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection input definitions for map', () => {
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
    const definitions = generateConnectionPayloadDefinition({}, {
      name: 'TestObject',
      parentFields,
      fields,
      connection: connections.referenceMap,
    })
    const expected = [
      codeBlock`
        type AddEntryToTestObjectReferenceMapPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `,
      codeBlock`
        type RemoveEntryFromTestObjectReferenceMapPayload {
          clientMutationId: String!
          ${parentFields}
          ${fields}
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
