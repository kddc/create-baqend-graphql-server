let resolvers = {
  Test: {
    reference: ({ reference }, args, { baqendResolver, baqendHeaders }) => {
      return baqendResolver.resolveReference('TestReference', reference, args, { baqendHeaders })
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  Comment: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    parent: ({ parent }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Comment', parent, args)
    },
    post: ({ post }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Post', post, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  TestReference: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  Post: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  User: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  Role: {
    users: ({ users }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('User', users, args)
    }
  },
  TestConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  TestEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  CommentConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  CommentEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  DeviceConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  DeviceEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  TestReferenceConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  TestReferenceEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  PostConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  PostEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  ReferenceConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  ReferenceEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  UserConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  UserEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  EmbeddedConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  EmbeddedEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  RoleConnection: {
    edges: ({ edges }, args, { baqendResolver }) => {
      return edges
    },
    pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
      return pageInfo
    }
  },
  RoleEdge: {
    cursor: ({ cursor }, args, { baqendResolver }) => {
      return cursor
    },
    node: ({ node }, args, { baqendResolver }) => {
      return node
    }
  },
  CreateTestPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  UpdateTestPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddTestReferenceToTestReferenceListPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveTestReferenceFromTestReferenceListPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddTestReferenceToTestReferenceSetPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveTestReferenceFromTestReferenceSetPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddEntryToTestReferenceMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveEntryFromTestReferenceMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddStringToTestStringListPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveStringFromTestStringListPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddStringToTestStringSetPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveStringFromTestStringSetPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddEntryToTestStringMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveEntryFromTestStringMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddEmbeddedToTestEmbeddedListPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveEmbeddedFromTestEmbeddedListPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddEntryToTestEmbeddedMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveEntryFromTestEmbeddedMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  AddEntryToTestRefRefMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  RemoveEntryFromTestRefRefMapPayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    embedded: ({ embedded }, args, { baqendResolver }) => {
      return embedded
    },
    referenceList: ({ referenceList }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('TestReference', referenceList, args)
    },
    referenceSet: ({ referenceSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('TestReference', referenceSet, args)
    },
    referenceMap: ({ referenceMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], referenceMap, args)
    },
    stringList: ({ stringList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(stringList, args)
    },
    stringSet: ({ stringSet }, args, { baqendResolver }) => {
      return baqendResolver.resolveSet(stringSet, args)
    },
    stringMap: ({ stringMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], stringMap, args)
    },
    embeddedList: ({ embeddedList }, args, { baqendResolver }) => {
      return baqendResolver.resolveList(embeddedList, args)
    },
    embeddedMap: ({ embeddedMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'Embedded' ], embeddedMap, args)
    },
    refRefMap: ({ refRefMap }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], refRefMap, args)
    }
  },
  CreateCommentPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    parent: ({ parent }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Comment', parent, args)
    },
    post: ({ post }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Post', post, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  UpdateCommentPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    parent: ({ parent }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Comment', parent, args)
    },
    post: ({ post }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Post', post, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  AddCommentToCommentCommentsPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    parent: ({ parent }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Comment', parent, args)
    },
    post: ({ post }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Post', post, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  RemoveCommentFromCommentCommentsPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    parent: ({ parent }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Comment', parent, args)
    },
    post: ({ post }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Post', post, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  CreateTestReferencePayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  UpdateTestReferencePayload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  AddEntryToTestReferenceMap1Payload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  RemoveEntryFromTestReferenceMap1Payload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  AddEntryToTestReferenceMap2Payload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  RemoveEntryFromTestReferenceMap2Payload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  AddEntryToTestReferenceMap3Payload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  RemoveEntryFromTestReferenceMap3Payload: {
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('TestReference', reference, args)
    },
    map1: ({ map1 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, null ], map1, args)
    },
    map2: ({ map2 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ 'TestReference', 'TestReference' ], map2, args)
    },
    map3: ({ map3 }, args, { baqendResolver }) => {
      return baqendResolver.resolveMap([ null, 'TestReference' ], map3, args)
    }
  },
  CreatePostPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  UpdatePostPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  AddCommentToPostCommentsPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  RemoveCommentFromPostCommentsPayload: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args)
    },
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    }
  },
  CreateUserPayload: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  UpdateUserPayload: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  AddCommentToUserCommentsPayload: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  RemoveCommentFromUserCommentsPayload: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  AddPostToUserPostsPayload: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  RemovePostFromUserPostsPayload: {
    comments: ({ comments }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Comment', comments, args)
    },
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceList('Post', posts, args)
    },
    reference: ({ reference }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('Reference', reference, args)
    }
  },
  CreateRolePayload: {
    users: ({ users }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('User', users, args)
    }
  },
  UpdateRolePayload: {
    users: ({ users }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('User', users, args)
    }
  },
  AddUserToRoleUsersPayload: {
    users: ({ users }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('User', users, args)
    }
  },
  RemoveUserFromRoleUsersPayload: {
    users: ({ users }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceSet('User', users, args)
    }
  },
  Query: {
    Test: (root, args, { baqendResolver, baqendHeaders }) => {
      return baqendResolver.resolveReferenceQuery('Test', args, { baqendHeaders })
    },
    allTests: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('Test', args, {})
    },
    Comment: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Comment', id, {})
    },
    allComments: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('Comment', args, {})
    },
    Device: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Device', id, {})
    },
    allDevices: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('Device', args, {})
    },
    TestReference: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('TestReference', id, {})
    },
    allTestReferences: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('TestReference', args, {})
    },
    Post: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Post', id, {})
    },
    allPosts: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('Post', args, {})
    },
    Reference: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Reference', id, {})
    },
    allReferences: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('Reference', args, {})
    },
    User: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('User', id, {})
    },
    allUsers: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('User', args, {})
    },
    Role: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Role', id, {})
    },
    allRoles: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('Role', args, {})
    }
  },
  Mutation: {
    createTest: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('Test', args, {})
    },
    updateTest: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('Test', args, {})
    },
    deleteTest: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('Test', args, {})
    },
    addTestReferenceToTestReferenceList: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'referenceList', args, {})
    },
    removeTestReferenceFromTestReferenceList: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'referenceList', args, {})
    },
    addTestReferenceToTestReferenceSet: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'referenceSet', args, {})
    },
    removeTestReferenceFromTestReferenceSet: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'referenceSet', args, {})
    },
    addEntryToTestReferenceMap: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'referenceMap', args, {})
    },
    removeEntryFromTestReferenceMap: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'referenceMap', args, {})
    },
    addStringToTestStringList: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'stringList', args, {})
    },
    removeStringFromTestStringList: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'stringList', args, {})
    },
    addStringToTestStringSet: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'stringSet', args, {})
    },
    removeStringFromTestStringSet: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'stringSet', args, {})
    },
    addEntryToTestStringMap: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'stringMap', args, {})
    },
    removeEntryFromTestStringMap: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'stringMap', args, {})
    },
    addEmbeddedToTestEmbeddedList: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'embeddedList', args, {})
    },
    removeEmbeddedFromTestEmbeddedList: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'embeddedList', args, {})
    },
    addEntryToTestEmbeddedMap: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'embeddedMap', args, {})
    },
    removeEntryFromTestEmbeddedMap: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'embeddedMap', args, {})
    },
    addEntryToTestRefRefMap: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Test', 'refRefMap', args, {})
    },
    removeEntryFromTestRefRefMap: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Test', 'refRefMap', args, {})
    },
    createComment: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('Comment', args, {})
    },
    updateComment: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('Comment', args, {})
    },
    deleteComment: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('Comment', args, {})
    },
    addCommentToCommentComments: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Comment', 'comments', args, {})
    },
    removeCommentFromCommentComments: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Comment', 'comments', args, {})
    },
    createDevice: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('Device', args, {})
    },
    updateDevice: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('Device', args, {})
    },
    deleteDevice: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('Device', args, {})
    },
    createTestReference: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('TestReference', args, {})
    },
    updateTestReference: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('TestReference', args, {})
    },
    deleteTestReference: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('TestReference', args, {})
    },
    addEntryToTestReferenceMap1: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('TestReference', 'map1', args, {})
    },
    removeEntryFromTestReferenceMap1: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('TestReference', 'map1', args, {})
    },
    addEntryToTestReferenceMap2: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('TestReference', 'map2', args, {})
    },
    removeEntryFromTestReferenceMap2: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('TestReference', 'map2', args, {})
    },
    addEntryToTestReferenceMap3: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('TestReference', 'map3', args, {})
    },
    removeEntryFromTestReferenceMap3: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('TestReference', 'map3', args, {})
    },
    createPost: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('Post', args, {})
    },
    updatePost: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('Post', args, {})
    },
    deletePost: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('Post', args, {})
    },
    addCommentToPostComments: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Post', 'comments', args, {})
    },
    removeCommentFromPostComments: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Post', 'comments', args, {})
    },
    createReference: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('Reference', args, {})
    },
    updateReference: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('Reference', args, {})
    },
    deleteReference: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('Reference', args, {})
    },
    createUser: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('User', args, {})
    },
    updateUser: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('User', args, {})
    },
    deleteUser: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('User', args, {})
    },
    addCommentToUserComments: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('User', 'comments', args, {})
    },
    removeCommentFromUserComments: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('User', 'comments', args, {})
    },
    addPostToUserPosts: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('User', 'posts', args, {})
    },
    removePostFromUserPosts: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('User', 'posts', args, {})
    },
    createRole: (root, args, { baqendMutator }) => {
      return baqendMutator.createEntity('Role', args, {})
    },
    updateRole: (root, args, { baqendMutator }) => {
      return baqendMutator.updateEntity('Role', args, {})
    },
    deleteRole: (root, args, { baqendMutator }) => {
      return baqendMutator.deleteEntity('Role', args, {})
    },
    addUserToRoleUsers: (root, args, { baqendMutator }) => {
      return baqendMutator.addEntryToCollection('Role', 'users', args, {})
    },
    removeUserFromRoleUsers: (root, args, { baqendMutator }) => {
      return baqendMutator.removeEntryFromCollection('Role', 'users', args, {})
    }
  }
}
export default resolvers
