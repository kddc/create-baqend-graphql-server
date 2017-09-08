/* Require additional modules and handlers here */
var express = require('express');
var { graphql, buildSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools')
var { connectionFromArray } = require('graphql-relay');
var {
  nodeInterface,
  nodeDefinitions,
  globalIdResolver,
  nodeField,
  nodesField,
  pageInfoType,
  connectionDefinitions,
  connectionArgs,
  mutationWithClientMutationId,
  fromGlobalId
} = require('graphql-relay-tools');

var { connectionType } = connectionDefinitions({ name: 'Post' })
var { nodeResolver, nodesResolver } = nodeDefinitions(globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === "User") {
        return { id: 11, username: 'testAuthor', posts: [] };
    }
    if (type === "Post") {
        return { id: 21, title: "test", author: "author" };
    }
});

var typeDefs = `
    type Post implements Node {
        id: ID!
        title: String
        author: User
    }
    type User implements Node {
        id: ID!
        username: String
        posts: Post
    }
    type Query {
        Post: Post
        allPosts${connectionArgs()}: PostConnection
        User: User
        allUsers: [User]
    }
`

var resolvers = {
    Post: {
        author: function () {
            return { id: 12, username: 'testAuthor', posts: [] };
        }
    },
    User: {
        posts: function () {
            return [{ id: 22, title: "test", author: "author" }, { id: 23, title: "test", author: "author" }];
        }
    },
    Query: {
        Post: function () {
            return { id: 24, title: "test", author: "author" };
        },
        allPosts: function (query, args) {
            return connectionFromArray([{ id: 25, title: "test", author: "author" }, { id: 26, title: "test", author: "author" }], args);
        },
        User: function () {
            return { id: 13, username: 'testUser1', posts: [] };
        },
        allUsers: function () {
            return [{ id: 14, username: 'testUser2', posts: [] }, { id: 15, username: 'testUser3', posts: [] }];
        }
    }
}

var schema = makeExecutableSchema({
    typeDefs: [nodeInterface, typeDefs, connectionType, pageInfoType],
    resolvers,
});

exports.call = function(db, data, req) {
    return graphql(schema, data.query).then((response) => {
        return response
    });
};
