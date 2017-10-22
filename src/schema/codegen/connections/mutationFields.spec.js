import { codeBlock } from 'common-tags'
import generateConnectionMutationFieldDefinitions, {
  generateConnectionMutationFieldDefinition,
} from './mutationFields'

const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1)

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
}

describe('Generate object connection input definitions', () => {
  test('it should generate no connection payload definitions for abstract or embedded types', () => {
    const expected = []
    const abstractDefinitions = generateConnectionMutationFieldDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(expected)

    const embeddedDefinitions = generateConnectionMutationFieldDefinitions({}, {
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
    const definitions = generateConnectionMutationFieldDefinition({}, {
      name: 'TestObject',
      connection: connections.referenceList,
    })
    const addEntityName = 'addTestReferenceToTestObjectReferenceList'
    const removeEntityName = 'removeTestReferenceFromTestObjectReferenceList'
    const expected = [
      codeBlock`
        ${addEntityName}(input: ${ucfirst(addEntityName)}Input): ${ucfirst(addEntityName)}Payload
      `,
      codeBlock`
        ${removeEntityName}(input: ${ucfirst(removeEntityName)}Input): ${ucfirst(removeEntityName)}Payload
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
    const definitions = generateConnectionMutationFieldDefinition({}, {
      name: 'TestObject',
      connection: connections.stringList,
    })
    const addEntityName = 'addStringToTestObjectStringList'
    const removeEntityName = 'removeStringFromTestObjectStringList'
    const expected = [
      codeBlock`
        ${addEntityName}(input: ${ucfirst(addEntityName)}Input): ${ucfirst(addEntityName)}Payload
      `,
      codeBlock`
        ${removeEntityName}(input: ${ucfirst(removeEntityName)}Input): ${ucfirst(removeEntityName)}Payload
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
    const definitions = generateConnectionMutationFieldDefinition({}, {
      name: 'TestObject',
      connection: connections.embeddedList,
    })
    const addEntityName = 'addEmbeddedToTestObjectEmbeddedList'
    const removeEntityName = 'removeEmbeddedFromTestObjectEmbeddedList'
    const expected = [
      codeBlock`
        ${addEntityName}(input: ${ucfirst(addEntityName)}Input): ${ucfirst(addEntityName)}Payload
      `,
      codeBlock`
        ${removeEntityName}(input: ${ucfirst(removeEntityName)}Input): ${ucfirst(removeEntityName)}Payload
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
    const definitions = generateConnectionMutationFieldDefinition({}, {
      name: 'TestObject',
      connection: connections.referenceMap,
    })
    const addEntityName = 'addEntryToTestObjectReferenceMap'
    const removeEntityName = 'removeEntryFromTestObjectReferenceMap'
    const expected = [
      codeBlock`
        ${addEntityName}(input: ${ucfirst(addEntityName)}Input): ${ucfirst(addEntityName)}Payload
      `,
      codeBlock`
        ${removeEntityName}(input: ${ucfirst(removeEntityName)}Input): ${ucfirst(removeEntityName)}Payload
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
