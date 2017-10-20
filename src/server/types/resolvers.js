import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

function identity(value) {
  return value;
}

function parseDate(value) {
  return new Date(value)
}

function parseDateLiteral(ast) {
  if (ast.kind === Kind.STRING) {
    if(ast.value.split('T').length === 1 && ast.value.indexOf(':') !== -1) {
      const date = new Date()
      return new Date(date.getFullYear() + "-" + (1 + date.getMonth()) + "-" + date.getDate() + "T" + ast.value)
    }
    return new Date(ast.value)
  }
  return null;
}

function parseJSONLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
      // console.log(ast.value)
      // return parseLiteral(JSON.parse(ast.value))
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
}

let baqendResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize: identity,
    parseValue: parseDate,
    parseLiteral: parseDateLiteral
  }),
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: '`JSON` scalar type',
    serialize: identity,
    parseValue: identity,
    parseLiteral: parseJSONLiteral
  })
}

export default baqendResolvers
