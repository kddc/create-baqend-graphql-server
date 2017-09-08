var { graphql, buildSchema, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');


var schema = buildSchema(`
  type Link {
    url: String!
  }

  type Query {
    hello1: Link
  }
`);

var root = {
  hello1: () => {
    return {
      url: 'Hello World 1'
    }
  }
};

var Link2Type = new GraphQLObjectType({
  name: 'Link2',
  fields: {
    url: { type: GraphQLString },
  }
});

var QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello2: {
      type: Link2Type,
      resolve: function (_) {
        return {
          url: 'Hello World 2'
        }
      }
    }
  }
});

var schema2 = new GraphQLSchema({query: QueryType});
console.log(schema2.getPossibleTypes())


var typeDefs = `
  type Link {
    url: String!
  }

  type Query {
    hello3: Link
  }
`;

var resolvers = {
  Query: {
    hello3() {
      return {
        url: 'Hello World 3'
      };
    },
  }
}

var schema3 = makeExecutableSchema({
  typeDefs,
  resolvers,
});

graphql(schema, '{ hello1 { url }}', root).then((response) => {
  console.log(response);
});

graphql(schema2, '{ hello2, {url }}').then((response) => {
  console.log(response)
})

graphql(schema3, '{ hello3, {url }}').then((response) => {
  console.log(response)
})
