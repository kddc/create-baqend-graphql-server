import FieldParser from '../../src/schema/parsers/FieldParser'

const testTypes = [
  [ '/db/String', { superType: "scalar", type: "String" } ],
  [ '/db/Integer', { superType: "scalar", type: "Int" } ],
  [ '/db/Double', { superType: "scalar", type: "Float" } ],
  [ '/db/Boolean', { superType: "scalar", type: "Boolean" } ],
  // '/db/DateTime',
  // '/db/Date',
  // '/db/Time',
  // '/db/File',
  // '/db/GeoPoint',
  // '/db/JsonObject',
  // '/db/JsonArray',
  [ '/db/ObjectType', { superType: "object", type: "ObjectType" } ],
  [ '/db/collection.List[/db/String]', { superType: "collection", type: "String" } ],
  [ '/db/collection.Set[/db/String]', { superType: "collection", type: "String" } ],
  [ '/db/collection.Map[/db/String]', { superType: "collection", type: "String" } ],
  [ '/db/collection.Map[/db/ObjectType]', { superType: "collection", type: "ObjectType" } ],
  [ '/db/collection.Map[/db/ObjectType]', { superType: "collection", type: "ObjectType" } ],
  [ '/db/collection.Map[/db/ObjectType]', { superType: "collection", type: "ObjectType" } ]
]


describe('it should parse field types correctly', () => {
  testTypes.forEach((testType) => {
    test(`parse ${testType[0]}`, () => {
      const { superType, type } = FieldParser.parseType(testType[0])
      expect(superType).toBe(testType[1].superType)
      expect(type).toBe(testType[1].type)
    });
  })
})
