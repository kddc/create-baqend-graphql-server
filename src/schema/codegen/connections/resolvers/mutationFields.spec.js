import { codeBlock } from 'common-tags'
import generateConnectionMutationFieldResolverDefinitions, {
  generateConnectionMutationFieldResolverDefinition,
} from './mutationFields'

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

describe('Generate object connection mutation field resolver definitions', () => {
  test('it should not fail for empty connection lists', () => {
    const definitions = generateConnectionMutationFieldResolverDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: undefined,
    })
    expect(definitions.length).toBe(0)
  })
  test('it should generate no connection mutation field resolver definitions for abstract or embedded types', () => {
    const expected = []
    const abstractDefinitions = generateConnectionMutationFieldResolverDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(abstractDefinitions.length).toBe(0)
    expect(abstractDefinitions).toEqual(expected)

    const embeddedDefinitions = generateConnectionMutationFieldResolverDefinitions({}, {
      name: 'TestObject',
      abstract: true,
      embedded: false,
      connections: Object.values(connections),
    })
    expect(embeddedDefinitions.length).toBe(0)
    expect(embeddedDefinitions).toEqual(expected)
  })

  test('it should generate connection mutation field resolver definitions for reference list or set', () => {
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
    const definitions = generateConnectionMutationFieldResolverDefinition({}, {
      name: 'TestObject',
      connection: connections.referenceList,
    })
    const expected = [
      codeBlock`
        addTestReferenceToTestObjectReferenceList: (root, args, { baqendMutator }) => {
          return baqendMutator.addEntryToCollection('TestObject', 'referenceList', args, {})
        }
      `,
      codeBlock`
        removeTestReferenceFromTestObjectReferenceList: (root, args, { baqendMutator }) => {
          return baqendMutator.removeEntryFromCollection('TestObject', 'referenceList', args, {})
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection mutation field resolver definitions for string list or set', () => {
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
    const definitions = generateConnectionMutationFieldResolverDefinition({}, {
      name: 'TestObject',
      connection: connections.stringList,
    })
    const expected = [
      codeBlock`
        addStringToTestObjectStringList: (root, args, { baqendMutator }) => {
          return baqendMutator.addEntryToCollection('TestObject', 'stringList', args, {})
        }
      `,
      codeBlock`
        removeStringFromTestObjectStringList: (root, args, { baqendMutator }) => {
          return baqendMutator.removeEntryFromCollection('TestObject', 'stringList', args, {})
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection mutation field resolver definitions for embedded list', () => {
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
    const definitions = generateConnectionMutationFieldResolverDefinition({}, {
      name: 'TestObject',
      connection: connections.embeddedList,
    })
    const expected = [
      codeBlock`
        addEmbeddedToTestObjectEmbeddedList: (root, args, { baqendMutator }) => {
          return baqendMutator.addEntryToCollection('TestObject', 'embeddedList', args, {})
        }
      `,
      codeBlock`
        removeEmbeddedFromTestObjectEmbeddedList: (root, args, { baqendMutator }) => {
          return baqendMutator.removeEntryFromCollection('TestObject', 'embeddedList', args, {})
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })

  test('it should generate connection mutation field resolver definitions for map', () => {
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
    const definitions = generateConnectionMutationFieldResolverDefinition({}, {
      name: 'TestObject',
      connection: connections.referenceMap,
    })
    const expected = [
      codeBlock`
        addEntryToTestObjectReferenceMap: (root, args, { baqendMutator }) => {
          return baqendMutator.addEntryToCollection('TestObject', 'referenceMap', args, {})
        }
      `,
      codeBlock`
        removeEntryFromTestObjectReferenceMap: (root, args, { baqendMutator }) => {
          return baqendMutator.removeEntryFromCollection('TestObject', 'referenceMap', args, {})
        }
      `,
    ]
    expect(definitions.length).toBe(2)
    expect(definitions[0]).toEqual(expected[0])
    expect(definitions[1]).toEqual(expected[1])
  })
})
