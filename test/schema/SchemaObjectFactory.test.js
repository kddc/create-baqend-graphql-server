// import SchemaReader from '../../src/schema/readers/SchemaReader'
import SchemaObjectFactory from '../../src/schema/factories/SchemaObjectFactory'
import testSchema from './testSchema'

const schemaObjectFactory = new SchemaObjectFactory(testSchema)

describe('schema object should match format', () => {
  let schema = schemaObjectFactory.get()
  test('schema object match format', () => {
    expect(schema).toEqual(expect.objectContaining({
      types: expect.any(Object),
      resolvers: expect.any(Object)
    }))
  })
})

describe('objectTypes should match format', () => {
  let objectTypes = schemaObjectFactory.getTypes().objectTypes

  test('objectTypes is array', () => {
    expect(Array.isArray(objectTypes)).toBeTruthy()
  })

  test('objectTypes match format', () => {
    objectTypes.forEach((objectType) => {
      expect(objectType).toEqual(expect.objectContaining({
        name: expect.any(String),
        fields: expect.any(Object)
      }))
      objectType.fields.forEach((field) => {
        expect(field).toEqual(expect.objectContaining({
          name: expect.any(String),
          superType: expect.any(String),
          type: expect.any(String)
        }))
      })
    })
  })

})

describe('queryTypes should match format', () => {
  let queryTypes = schemaObjectFactory.getTypes().queryTypes

  test('queryTypes is array', () => {
    expect(Array.isArray(queryTypes)).toBeTruthy()
  })

  test('queryTypes match format', () => {
    queryTypes.forEach((queryType) => {
      expect(queryType).toEqual(expect.objectContaining({
        name: expect.any(String),
        args: expect.any(Object),
        type: expect.any(String),
        superType: expect.any(String)
      }))
    })
  })
})

describe('objectTypeResolvers should match format', () => {
  let objectTypeResolvers = schemaObjectFactory.getResolvers().objectTypeResolvers

  test('objectTypeResolvers is array', () => {
    expect(Array.isArray(objectTypeResolvers)).toBeTruthy()
  })

  test('objectTypeResolvers match format', () => {
    objectTypeResolvers.forEach((objectTypeResolver) => {
      expect(objectTypeResolver).toEqual(expect.objectContaining({
        name: expect.any(String),
        resolvers: expect.any(Object)
      }))
      objectTypeResolver.resolvers.forEach((resolver) => {
        expect(resolver).toEqual(expect.objectContaining({
          name: expect.any(String),
          type: expect.any(String),
          superType: expect.any(String),
          resolve: expect.any(Object)
        }))
      })
    })
  })
})

describe('queryTypeResolvers should match format', () => {
  let queryTypeResolvers = schemaObjectFactory.getResolvers().queryTypeResolvers

  test('queryTypeResolvers is array', () => {
    expect(Array.isArray(queryTypeResolvers)).toBeTruthy()
  })

  test('queryTypeResolvers match format', () => {
    queryTypeResolvers.forEach((queryTypeResolver) => {
      expect(queryTypeResolver).toEqual(expect.objectContaining({
        name: expect.any(String),
        type: expect.any(String),
        superType: expect.any(String),
        resolve: expect.any(Object)
      }))
    })
  })
})
