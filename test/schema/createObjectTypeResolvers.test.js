// [{
//   name: 'TestClass',
//   fields: [
//     { name: 'string', superType: 'scalar', type: 'String' },
//     { name: 'reference', superType: 'object', type: 'ReferenceClass' },
//     { name: 'referenceCollection', superType: 'collection', type: 'ReferenceClass' }
//   ]
// }]

// [ { name: 'Post',
//           resolvers:
//            [ { name: 'author',
//                type: 'User',
//                superType: 'object',
//                resolve: '({ author }, args, context) => {\n  return resolveTypeReference(\'User\', author, args, context)\n}' } ] },
