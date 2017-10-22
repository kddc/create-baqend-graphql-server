import { codeBlock } from 'common-tags'
import generateFieldResolverDefinitions from './resolver'

describe('Generate field type definition', () => {
  test('it should generate a scalar type definition', () => {
    const params = {
      name: 'string',
      fieldType: 'scalar',
      elementType: 'String',
    }
    const expected = codeBlock`
      string: ({ string }, args, { baqendResolver }) => {
        return string
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a reference type definition', () => {
    const params = {
      name: 'reference',
      fieldType: 'reference',
      elementType: 'TestReference',
    }
    const expected = codeBlock`
      reference: ({ reference }, args, { baqendResolver }) => {
        return baqendResolver.resolveReference('TestReference', reference, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })

  test('it should generate a embedded type definition', () => {
    const params = {
      name: 'embedded',
      fieldType: 'embedded',
      elementType: 'Embedded',
    }
    const expected = codeBlock`
      embedded: ({ embedded }, args, { baqendResolver }) => {
        return embedded
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      referenceList: ({ referenceList }, args, { baqendResolver }) => {
        return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      stringList: ({ stringList }, args, { baqendResolver }) => {
        return baqendResolver.resolveList(stringList, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
        return baqendResolver.resolveList(embeddedList, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
        return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      stringSet: ({ stringSet }, args, { baqendResolver }) => {
        return baqendResolver.resolveSet(stringSet, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
        return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      stringMap: ({ stringMap }, args, { baqendResolver }) => {
        return baqendResolver.resolveMap([ null, null ], stringMap, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
        return baqendResolver.resolveMap([ null, null ], embeddedMap, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
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
      refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
        return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
      }
    `
    const definition = generateFieldResolverDefinitions({}, params)
    expect(definition[0]).toEqual(expected)
  })
})
