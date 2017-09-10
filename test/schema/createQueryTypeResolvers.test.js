// [ { name: 'Post', args: [], type: 'Post', superType: 'object' },
//         { name: 'allPosts',
//           args: [],
//           type: 'Post',
//           superType: 'collection' },

// [ { name: 'Post',
//           type: 'Post',
//           superType: 'object',
//           resolve: '(root, args, context) => {\n  return resolveObjectQuery(\'Post\', args, context)\n}' },
//         { name: 'allPosts',
//           type: 'Post',
//           superType: 'collection',
//           resolve: '(root, args, context) => {\n  return resolveCollectionQuery(\'Post\', args, context)\n}' },

// !!!!! [
// ['{ author }', 'args', 'context'], ['resolveTypeReference', ['User', 'author', 'args', 'context']]
