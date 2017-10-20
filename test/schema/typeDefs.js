let typeDefs = `
  interface Node {
    id: ID!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }
  type StringConnection {
    total: Int
    edges: [StringEdge]
    pageInfo: PageInfo!
  }
  type StringEdge {
    cursor: String!
    node: String
  }
  type Test implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type Comment implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    author: User
    text: String
    created: Date
    parent: Comment
    post: Post
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
  }
  interface Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
  }
  type Device implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    deviceOs: String
  }
  type TestReference implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type Post implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    title: String
    author: User
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    picture: String
  }
  type Reference implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    text: String
  }
  type User implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type Embedded {
    string: String
  }
  type Role implements Node, Object {
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    name: String
    users(filter: UserFilter): [User]
  }
  type StringTestReferenceMapEntry {
    key: String
    value: TestReference
  }
  type StringStringMapEntry {
    key: String
    value: String
  }
  type StringEmbeddedMapEntry {
    key: String
    value: Embedded
  }
  type TestReferenceTestReferenceMapEntry {
    key: TestReference
    value: TestReference
  }
  type TestConnection {
    total: Int
    edges: [TestEdge]
    pageInfo: PageInfo!
  }
  type TestEdge {
    cursor: String!
    node: Test
  }
  type CommentConnection {
    total: Int
    edges: [CommentEdge]
    pageInfo: PageInfo!
  }
  type CommentEdge {
    cursor: String!
    node: Comment
  }
  type DeviceConnection {
    total: Int
    edges: [DeviceEdge]
    pageInfo: PageInfo!
  }
  type DeviceEdge {
    cursor: String!
    node: Device
  }
  type TestReferenceConnection {
    total: Int
    edges: [TestReferenceEdge]
    pageInfo: PageInfo!
  }
  type TestReferenceEdge {
    cursor: String!
    node: TestReference
  }
  type PostConnection {
    total: Int
    edges: [PostEdge]
    pageInfo: PageInfo!
  }
  type PostEdge {
    cursor: String!
    node: Post
  }
  type ReferenceConnection {
    total: Int
    edges: [ReferenceEdge]
    pageInfo: PageInfo!
  }
  type ReferenceEdge {
    cursor: String!
    node: Reference
  }
  type UserConnection {
    total: Int
    edges: [UserEdge]
    pageInfo: PageInfo!
  }
  type UserEdge {
    cursor: String!
    node: User
  }
  type EmbeddedConnection {
    total: Int
    edges: [EmbeddedEdge]
    pageInfo: PageInfo!
  }
  type EmbeddedEdge {
    cursor: String!
    node: Embedded
  }
  type RoleConnection {
    total: Int
    edges: [RoleEdge]
    pageInfo: PageInfo!
  }
  type RoleEdge {
    cursor: String!
    node: Role
  }
  input IDFilter {
    eq: String
    ne: String
    in: [String!]
    nin: [String!]
    exists: Boolean
    gt: String
    gte: String
    lt: String
    lte: String
    regex: String
  }
  input StringFilter {
    eq: String
    ne: String
    in: [String!]
    nin: [String!]
    exists: Boolean
    gt: String
    gte: String
    lt: String
    lte: String
    regex: String
  }
  input FloatFilter {
    eq: Float
    ne: Float
    in: [Float!]
    nin: [Float!]
    exists: Boolean
    gt: Float
    gte: Float
    lt: Float
    lte: Float
  }
  input IntFilter {
    eq: Int
    ne: Int
    in: [Int!]
    nin: [Int!]
    exists: Boolean
    gt: Int
    gte: Int
    lt: Int
    lte: Int
  }
  input BooleanFilter {
    eq: Boolean
    ne: Boolean
    in: [Boolean!]
    nin: [Boolean!]
    exists: Boolean
  }
  input DateFilter {
    eq: Date
    ne: Date
    in: [Date!]
    nin: [Date!]
    exists: Date
    gt: Date
    gte: Date
    lt: Date
    lte: Date
  }
  input JSONFilter {
    eq: JSON
    ne: JSON
    in: [JSON!]
    nin: [JSON!]
    exists: Boolean
  }
  input ObjectFilter {
    exists: Boolean
  }
  input CollectionFilter {
    exists: Boolean
  }
  enum Direction {
    ASC
    DESC
  }
  input TestFilter {
    or: [TestFilter!]
    and: [TestFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    string: StringFilter
    double: FloatFilter
    integer: IntFilter
    boolean: BooleanFilter
    datetime: DateFilter
    date: DateFilter
    time: DateFilter
    array: JSONFilter
    json: JSONFilter
    reference: TestReferenceFilter
    embedded: EmbeddedFilter
    referenceList: CollectionFilter
    referenceSet: CollectionFilter
    referenceMap: CollectionFilter
    stringList: CollectionFilter
    stringSet: CollectionFilter
    stringMap: CollectionFilter
    embeddedList: CollectionFilter
    embeddedMap: CollectionFilter
    refRefMap: CollectionFilter
    geopoint: StringFilter
  }
  input TestSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    string: Direction
    double: Direction
    integer: Direction
    boolean: Direction
    datetime: Direction
    date: Direction
    time: Direction
    array: Direction
    json: Direction
    reference: Direction
    embedded: Direction
    referenceList: Direction
    referenceSet: Direction
    referenceMap: Direction
    stringList: Direction
    stringSet: Direction
    stringMap: Direction
    embeddedList: Direction
    embeddedMap: Direction
    refRefMap: Direction
    geopoint: Direction
  }
  input CommentFilter {
    or: [CommentFilter!]
    and: [CommentFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    author: UserFilter
    text: StringFilter
    created: DateFilter
    parent: CommentFilter
    post: PostFilter
    comments: CollectionFilter
  }
  input CommentSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    author: Direction
    text: Direction
    created: Direction
    parent: Direction
    post: Direction
    comments: Direction
  }
  input DeviceFilter {
    or: [DeviceFilter!]
    and: [DeviceFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    deviceOs: StringFilter
  }
  input DeviceSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    deviceOs: Direction
  }
  input TestReferenceFilter {
    or: [TestReferenceFilter!]
    and: [TestReferenceFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    string: StringFilter
    reference: TestReferenceFilter
    map1: CollectionFilter
    map2: CollectionFilter
    map3: CollectionFilter
  }
  input TestReferenceSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    string: Direction
    reference: Direction
    map1: Direction
    map2: Direction
    map3: Direction
  }
  input PostFilter {
    or: [PostFilter!]
    and: [PostFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    title: StringFilter
    author: UserFilter
    created: DateFilter
    url: StringFilter
    text: StringFilter
    type: StringFilter
    score: IntFilter
    descendants: IntFilter
    comments: CollectionFilter
    picture: StringFilter
  }
  input PostSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    title: Direction
    author: Direction
    created: Direction
    url: Direction
    text: Direction
    type: Direction
    score: Direction
    descendants: Direction
    comments: Direction
    picture: Direction
  }
  input ReferenceFilter {
    or: [ReferenceFilter!]
    and: [ReferenceFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    text: StringFilter
  }
  input ReferenceSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    text: Direction
  }
  input UserFilter {
    or: [UserFilter!]
    and: [UserFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    username: StringFilter
    email: StringFilter
    name: StringFilter
    inactive: BooleanFilter
    comments: CollectionFilter
    posts: CollectionFilter
    reference: ReferenceFilter
  }
  input UserSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    username: Direction
    email: Direction
    name: Direction
    inactive: Direction
    comments: Direction
    posts: Direction
    reference: Direction
  }
  input EmbeddedFilter {
    or: [EmbeddedFilter!]
    and: [EmbeddedFilter!]
    string: StringFilter
  }
  input EmbeddedSortBy {
    string: Direction
  }
  input RoleFilter {
    or: [RoleFilter!]
    and: [RoleFilter!]
    id: IDFilter
    version: IntFilter
    acl: JSONFilter
    createdAt: DateFilter
    updatedAt: DateFilter
    name: StringFilter
    users: CollectionFilter
  }
  input RoleSortBy {
    id: Direction
    version: Direction
    acl: Direction
    createdAt: Direction
    updatedAt: Direction
    name: Direction
    users: Direction
  }
  input StringTestReferenceMapInput {
    key: String!
    value: TestReferenceInput!
  }
  input StringTestReferenceMapInputIds {
    key: String!
    value: ID!
  }
  input StringStringMapInput {
    key: String!
    value: String!
  }
  input StringEmbeddedMapInput {
    key: String!
    value: EmbeddedInput!
  }
  input TestReferenceTestReferenceMapInput {
    key: ID!
    value: TestReferenceInput!
  }
  input TestReferenceTestReferenceMapInputIds {
    key: ID!
    value: ID!
  }
  input TestInput {
    id: ID
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    referenceId: ID
    reference: TestReferenceInput
    embedded: EmbeddedInput
    referenceListIds: [ID!]
    referenceList: [TestReferenceInput!]
    referenceSetIds: [ID!]
    referenceSet: [TestReferenceInput!]
    referenceMapIds: [StringTestReferenceMapInputIds!]
    referenceMap: [StringTestReferenceMapInput!]
    stringListIds: [ID!]
    stringList: [String!]
    stringSetIds: [ID!]
    stringSet: [String!]
    stringMap: [StringStringMapInput!]
    embeddedListIds: [ID!]
    embeddedList: [EmbeddedInput!]
    embeddedMap: [StringEmbeddedMapInput!]
    refRefMapIds: [TestReferenceTestReferenceMapInputIds!]
    refRefMap: [TestReferenceTestReferenceMapInput!]
    geopoint: String
  }
  input CreateTestInput {
    clientMutationId: String!
    id: ID
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    referenceId: ID
    reference: TestReferenceInput
    embedded: EmbeddedInput
    referenceListIds: [ID!]
    referenceList: [TestReferenceInput!]
    referenceSetIds: [ID!]
    referenceSet: [TestReferenceInput!]
    referenceMapIds: [StringTestReferenceMapInputIds!]
    referenceMap: [StringTestReferenceMapInput!]
    stringListIds: [ID!]
    stringList: [String!]
    stringSetIds: [ID!]
    stringSet: [String!]
    stringMap: [StringStringMapInput!]
    embeddedListIds: [ID!]
    embeddedList: [EmbeddedInput!]
    embeddedMap: [StringEmbeddedMapInput!]
    refRefMapIds: [TestReferenceTestReferenceMapInputIds!]
    refRefMap: [TestReferenceTestReferenceMapInput!]
    geopoint: String
  }
  input UpdateTestInput {
    clientMutationId: String!
    id: ID!
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    referenceId: ID
    reference: TestReferenceInput
    embedded: EmbeddedInput
    referenceListIds: [ID!]
    referenceList: [TestReferenceInput!]
    referenceSetIds: [ID!]
    referenceSet: [TestReferenceInput!]
    referenceMapIds: [StringTestReferenceMapInputIds!]
    referenceMap: [StringTestReferenceMapInput!]
    stringListIds: [ID!]
    stringList: [String!]
    stringSetIds: [ID!]
    stringSet: [String!]
    stringMap: [StringStringMapInput!]
    embeddedListIds: [ID!]
    embeddedList: [EmbeddedInput!]
    embeddedMap: [StringEmbeddedMapInput!]
    refRefMapIds: [TestReferenceTestReferenceMapInputIds!]
    refRefMap: [TestReferenceTestReferenceMapInput!]
    geopoint: String
  }
  input DeleteTestInput {
    clientMutationId: String!
    id: ID!
  }
  input AddTestReferenceToTestReferenceListInput {
    clientMutationId: String!
    id: ID!
    referenceListEntryId: ID
    referenceListEntry: TestReferenceInput
  }
  input RemoveTestReferenceFromTestReferenceListInput {
    clientMutationId: String!
    id: ID!
    referenceListEntryId: ID
  }
  input AddTestReferenceToTestReferenceSetInput {
    clientMutationId: String!
    id: ID!
    referenceSetEntryId: ID
    referenceSetEntry: TestReferenceInput
  }
  input RemoveTestReferenceFromTestReferenceSetInput {
    clientMutationId: String!
    id: ID!
    referenceSetEntryId: ID
  }
  input AddEntryToTestReferenceMapInput {
    clientMutationId: String!
    id: ID!
    referenceMapEntryIds: StringTestReferenceMapInputIds
    referenceMapEntry: StringTestReferenceMapInput
  }
  input RemoveEntryFromTestReferenceMapInput {
    clientMutationId: String!
    id: ID!
    referenceMapEntryIds: StringTestReferenceMapInputIds
  }
  input AddStringToTestStringListInput {
    clientMutationId: String!
    id: ID!
    stringListEntry: String
  }
  input RemoveStringFromTestStringListInput {
    clientMutationId: String!
    id: ID!
    stringListEntry: String
  }
  input AddStringToTestStringSetInput {
    clientMutationId: String!
    id: ID!
    stringSetEntry: String
  }
  input RemoveStringFromTestStringSetInput {
    clientMutationId: String!
    id: ID!
    stringSetEntry: String
  }
  input AddEntryToTestStringMapInput {
    clientMutationId: String!
    id: ID!
    stringMapEntry: StringStringMapInput
  }
  input RemoveEntryFromTestStringMapInput {
    clientMutationId: String!
    id: ID!
    stringMapEntry: StringStringMapInput
  }
  input AddEmbeddedToTestEmbeddedListInput {
    clientMutationId: String!
    id: ID!
    embeddedListEntry: EmbeddedInput
  }
  input RemoveEmbeddedFromTestEmbeddedListInput {
    clientMutationId: String!
    id: ID!
    embeddedListEntry: EmbeddedInput
  }
  input AddEntryToTestEmbeddedMapInput {
    clientMutationId: String!
    id: ID!
    embeddedMapEntry: StringEmbeddedMapInput
  }
  input RemoveEntryFromTestEmbeddedMapInput {
    clientMutationId: String!
    id: ID!
    embeddedMapEntry: StringEmbeddedMapInput
  }
  input AddEntryToTestRefRefMapInput {
    clientMutationId: String!
    id: ID!
    refRefMapEntryIds: TestReferenceTestReferenceMapInputIds
    refRefMapEntry: TestReferenceTestReferenceMapInput
  }
  input RemoveEntryFromTestRefRefMapInput {
    clientMutationId: String!
    id: ID!
    refRefMapEntryIds: TestReferenceTestReferenceMapInputIds
  }
  input CommentInput {
    id: ID
    authorId: ID
    author: UserInput
    text: String
    created: Date
    parentId: ID
    parent: CommentInput
    postId: ID
    post: PostInput
    commentsIds: [ID!]
    comments: [CommentInput!]
  }
  input CreateCommentInput {
    clientMutationId: String!
    id: ID
    authorId: ID
    author: UserInput
    text: String
    created: Date
    parentId: ID
    parent: CommentInput
    postId: ID
    post: PostInput
    commentsIds: [ID!]
    comments: [CommentInput!]
  }
  input UpdateCommentInput {
    clientMutationId: String!
    id: ID!
    authorId: ID
    author: UserInput
    text: String
    created: Date
    parentId: ID
    parent: CommentInput
    postId: ID
    post: PostInput
    commentsIds: [ID!]
    comments: [CommentInput!]
  }
  input DeleteCommentInput {
    clientMutationId: String!
    id: ID!
  }
  input AddCommentToCommentCommentsInput {
    clientMutationId: String!
    id: ID!
    commentsEntryId: ID
    commentsEntry: CommentInput
  }
  input RemoveCommentFromCommentCommentsInput {
    clientMutationId: String!
    id: ID!
    commentsEntryId: ID
  }
  input DeviceInput {
    id: ID
    deviceOs: String
  }
  input CreateDeviceInput {
    clientMutationId: String!
    id: ID
    deviceOs: String
  }
  input UpdateDeviceInput {
    clientMutationId: String!
    id: ID!
    deviceOs: String
  }
  input DeleteDeviceInput {
    clientMutationId: String!
    id: ID!
  }
  input TestReferenceInput {
    id: ID
    string: String
    referenceId: ID
    reference: TestReferenceInput
    map1: [StringStringMapInput!]
    map2Ids: [TestReferenceTestReferenceMapInputIds!]
    map2: [TestReferenceTestReferenceMapInput!]
    map3Ids: [StringTestReferenceMapInputIds!]
    map3: [StringTestReferenceMapInput!]
  }
  input CreateTestReferenceInput {
    clientMutationId: String!
    id: ID
    string: String
    referenceId: ID
    reference: TestReferenceInput
    map1: [StringStringMapInput!]
    map2Ids: [TestReferenceTestReferenceMapInputIds!]
    map2: [TestReferenceTestReferenceMapInput!]
    map3Ids: [StringTestReferenceMapInputIds!]
    map3: [StringTestReferenceMapInput!]
  }
  input UpdateTestReferenceInput {
    clientMutationId: String!
    id: ID!
    string: String
    referenceId: ID
    reference: TestReferenceInput
    map1: [StringStringMapInput!]
    map2Ids: [TestReferenceTestReferenceMapInputIds!]
    map2: [TestReferenceTestReferenceMapInput!]
    map3Ids: [StringTestReferenceMapInputIds!]
    map3: [StringTestReferenceMapInput!]
  }
  input DeleteTestReferenceInput {
    clientMutationId: String!
    id: ID!
  }
  input AddEntryToTestReferenceMap1Input {
    clientMutationId: String!
    id: ID!
    map1Entry: StringStringMapInput
  }
  input RemoveEntryFromTestReferenceMap1Input {
    clientMutationId: String!
    id: ID!
    map1Entry: StringStringMapInput
  }
  input AddEntryToTestReferenceMap2Input {
    clientMutationId: String!
    id: ID!
    map2EntryIds: TestReferenceTestReferenceMapInputIds
    map2Entry: TestReferenceTestReferenceMapInput
  }
  input RemoveEntryFromTestReferenceMap2Input {
    clientMutationId: String!
    id: ID!
    map2EntryIds: TestReferenceTestReferenceMapInputIds
  }
  input AddEntryToTestReferenceMap3Input {
    clientMutationId: String!
    id: ID!
    map3EntryIds: StringTestReferenceMapInputIds
    map3Entry: StringTestReferenceMapInput
  }
  input RemoveEntryFromTestReferenceMap3Input {
    clientMutationId: String!
    id: ID!
    map3EntryIds: StringTestReferenceMapInputIds
  }
  input PostInput {
    id: ID
    title: String
    authorId: ID
    author: UserInput
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    commentsIds: [ID!]
    comments: [CommentInput!]
    picture: String
  }
  input CreatePostInput {
    clientMutationId: String!
    id: ID
    title: String
    authorId: ID
    author: UserInput
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    commentsIds: [ID!]
    comments: [CommentInput!]
    picture: String
  }
  input UpdatePostInput {
    clientMutationId: String!
    id: ID!
    title: String
    authorId: ID
    author: UserInput
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    commentsIds: [ID!]
    comments: [CommentInput!]
    picture: String
  }
  input DeletePostInput {
    clientMutationId: String!
    id: ID!
  }
  input AddCommentToPostCommentsInput {
    clientMutationId: String!
    id: ID!
    commentsEntryId: ID
    commentsEntry: CommentInput
  }
  input RemoveCommentFromPostCommentsInput {
    clientMutationId: String!
    id: ID!
    commentsEntryId: ID
  }
  input ReferenceInput {
    id: ID
    text: String
  }
  input CreateReferenceInput {
    clientMutationId: String!
    id: ID
    text: String
  }
  input UpdateReferenceInput {
    clientMutationId: String!
    id: ID!
    text: String
  }
  input DeleteReferenceInput {
    clientMutationId: String!
    id: ID!
  }
  input UserInput {
    id: ID
    username: String
    email: String
    name: String
    inactive: Boolean
    commentsIds: [ID!]
    comments: [CommentInput!]
    postsIds: [ID!]
    posts: [PostInput!]
    referenceId: ID
    reference: ReferenceInput
  }
  input CreateUserInput {
    clientMutationId: String!
    id: ID
    username: String
    email: String
    name: String
    inactive: Boolean
    commentsIds: [ID!]
    comments: [CommentInput!]
    postsIds: [ID!]
    posts: [PostInput!]
    referenceId: ID
    reference: ReferenceInput
  }
  input UpdateUserInput {
    clientMutationId: String!
    id: ID!
    username: String
    email: String
    name: String
    inactive: Boolean
    commentsIds: [ID!]
    comments: [CommentInput!]
    postsIds: [ID!]
    posts: [PostInput!]
    referenceId: ID
    reference: ReferenceInput
  }
  input DeleteUserInput {
    clientMutationId: String!
    id: ID!
  }
  input AddCommentToUserCommentsInput {
    clientMutationId: String!
    id: ID!
    commentsEntryId: ID
    commentsEntry: CommentInput
  }
  input RemoveCommentFromUserCommentsInput {
    clientMutationId: String!
    id: ID!
    commentsEntryId: ID
  }
  input AddPostToUserPostsInput {
    clientMutationId: String!
    id: ID!
    postsEntryId: ID
    postsEntry: PostInput
  }
  input RemovePostFromUserPostsInput {
    clientMutationId: String!
    id: ID!
    postsEntryId: ID
  }
  input EmbeddedInput {
    id: ID
    string: String
  }
  input RoleInput {
    id: ID
    name: String
    usersIds: [ID!]
    users: [UserInput!]
  }
  input CreateRoleInput {
    clientMutationId: String!
    id: ID
    name: String
    usersIds: [ID!]
    users: [UserInput!]
  }
  input UpdateRoleInput {
    clientMutationId: String!
    id: ID!
    name: String
    usersIds: [ID!]
    users: [UserInput!]
  }
  input DeleteRoleInput {
    clientMutationId: String!
    id: ID!
  }
  input AddUserToRoleUsersInput {
    clientMutationId: String!
    id: ID!
    usersEntryId: ID
    usersEntry: UserInput
  }
  input RemoveUserFromRoleUsersInput {
    clientMutationId: String!
    id: ID!
    usersEntryId: ID
  }
  type CreateTestPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type UpdateTestPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type DeleteTestPayload {
    clientMutationId: String!
    id: ID!
  }
  type AddTestReferenceToTestReferenceListPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveTestReferenceFromTestReferenceListPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddTestReferenceToTestReferenceSetPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveTestReferenceFromTestReferenceSetPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddEntryToTestReferenceMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveEntryFromTestReferenceMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddStringToTestStringListPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveStringFromTestStringListPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddStringToTestStringSetPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveStringFromTestStringSetPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddEntryToTestStringMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveEntryFromTestStringMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddEmbeddedToTestEmbeddedListPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveEmbeddedFromTestEmbeddedListPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddEntryToTestEmbeddedMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveEntryFromTestEmbeddedMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type AddEntryToTestRefRefMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type RemoveEntryFromTestRefRefMapPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    double: Float
    integer: Int
    boolean: Boolean
    datetime: Date
    date: Date
    time: Date
    array: JSON
    json: JSON
    reference: TestReference
    embedded: Embedded
    referenceList(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    referenceSet(filter: TestReferenceFilter): [TestReference]
    referenceMap: [StringTestReferenceMapEntry]
    stringList(first: Int, after: String, last: Int, before: String): StringConnection
    stringSet: [String]
    stringMap: [StringStringMapEntry]
    embeddedList(first: Int, after: String, last: Int, before: String): EmbeddedConnection
    embeddedMap: [StringEmbeddedMapEntry]
    refRefMap: [TestReferenceTestReferenceMapEntry]
    geopoint: String
  }
  type CreateCommentPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    author: User
    text: String
    created: Date
    parent: Comment
    post: Post
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
  }
  type UpdateCommentPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    author: User
    text: String
    created: Date
    parent: Comment
    post: Post
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
  }
  type DeleteCommentPayload {
    clientMutationId: String!
    id: ID!
  }
  type AddCommentToCommentCommentsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    author: User
    text: String
    created: Date
    parent: Comment
    post: Post
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
  }
  type RemoveCommentFromCommentCommentsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    author: User
    text: String
    created: Date
    parent: Comment
    post: Post
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
  }
  type CreateDevicePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    deviceOs: String
  }
  type UpdateDevicePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    deviceOs: String
  }
  type DeleteDevicePayload {
    clientMutationId: String!
    id: ID!
  }
  type CreateTestReferencePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type UpdateTestReferencePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type DeleteTestReferencePayload {
    clientMutationId: String!
    id: ID!
  }
  type AddEntryToTestReferenceMap1Payload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type RemoveEntryFromTestReferenceMap1Payload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type AddEntryToTestReferenceMap2Payload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type RemoveEntryFromTestReferenceMap2Payload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type AddEntryToTestReferenceMap3Payload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type RemoveEntryFromTestReferenceMap3Payload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    string: String
    reference: TestReference
    map1: [StringStringMapEntry]
    map2: [TestReferenceTestReferenceMapEntry]
    map3: [StringTestReferenceMapEntry]
  }
  type CreatePostPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    title: String
    author: User
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    picture: String
  }
  type UpdatePostPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    title: String
    author: User
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    picture: String
  }
  type DeletePostPayload {
    clientMutationId: String!
    id: ID!
  }
  type AddCommentToPostCommentsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    title: String
    author: User
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    picture: String
  }
  type RemoveCommentFromPostCommentsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    title: String
    author: User
    created: Date
    url: String
    text: String
    type: String
    score: Int
    descendants: Int
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    picture: String
  }
  type CreateReferencePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    text: String
  }
  type UpdateReferencePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    text: String
  }
  type DeleteReferencePayload {
    clientMutationId: String!
    id: ID!
  }
  type CreateUserPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type UpdateUserPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type DeleteUserPayload {
    clientMutationId: String!
    id: ID!
  }
  type AddCommentToUserCommentsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type RemoveCommentFromUserCommentsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type AddPostToUserPostsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type RemovePostFromUserPostsPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    username: String
    email: String
    name: String
    inactive: Boolean
    comments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    posts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    reference: Reference
  }
  type CreateRolePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    name: String
    users(filter: UserFilter): [User]
  }
  type UpdateRolePayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    name: String
    users(filter: UserFilter): [User]
  }
  type DeleteRolePayload {
    clientMutationId: String!
    id: ID!
  }
  type AddUserToRoleUsersPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    name: String
    users(filter: UserFilter): [User]
  }
  type RemoveUserFromRoleUsersPayload {
    clientMutationId: String!
    id: ID!
    version: Int
    acl: JSON
    createdAt: Date
    updatedAt: Date
    name: String
    users(filter: UserFilter): [User]
  }
  type Query {
    node(id: ID!): Node
    nodes(ids: [ID!]!): [Node]!
    Test(id: ID!): Test
    allTests(filter: TestFilter, sortBy: TestSortBy, first: Int, after: String, last: Int, before: String): TestConnection
    Comment(id: ID!): Comment
    allComments(filter: CommentFilter, sortBy: CommentSortBy, first: Int, after: String, last: Int, before: String): CommentConnection
    Device(id: ID!): Device
    allDevices(filter: DeviceFilter, sortBy: DeviceSortBy, first: Int, after: String, last: Int, before: String): DeviceConnection
    TestReference(id: ID!): TestReference
    allTestReferences(filter: TestReferenceFilter, sortBy: TestReferenceSortBy, first: Int, after: String, last: Int, before: String): TestReferenceConnection
    Post(id: ID!): Post
    allPosts(filter: PostFilter, sortBy: PostSortBy, first: Int, after: String, last: Int, before: String): PostConnection
    Reference(id: ID!): Reference
    allReferences(filter: ReferenceFilter, sortBy: ReferenceSortBy, first: Int, after: String, last: Int, before: String): ReferenceConnection
    User(id: ID!): User
    allUsers(filter: UserFilter, sortBy: UserSortBy, first: Int, after: String, last: Int, before: String): UserConnection
    Role(id: ID!): Role
    allRoles(filter: RoleFilter, sortBy: RoleSortBy, first: Int, after: String, last: Int, before: String): RoleConnection
  }
  type Mutation {
    createTest(input: CreateTestInput): CreateTestPayload
    updateTest(input: UpdateTestInput): UpdateTestPayload
    deleteTest(input: DeleteTestInput): DeleteTestPayload
    createComment(input: CreateCommentInput): CreateCommentPayload
    updateComment(input: UpdateCommentInput): UpdateCommentPayload
    deleteComment(input: DeleteCommentInput): DeleteCommentPayload
    createDevice(input: CreateDeviceInput): CreateDevicePayload
    updateDevice(input: UpdateDeviceInput): UpdateDevicePayload
    deleteDevice(input: DeleteDeviceInput): DeleteDevicePayload
    createTestReference(input: CreateTestReferenceInput): CreateTestReferencePayload
    updateTestReference(input: UpdateTestReferenceInput): UpdateTestReferencePayload
    deleteTestReference(input: DeleteTestReferenceInput): DeleteTestReferencePayload
    createPost(input: CreatePostInput): CreatePostPayload
    updatePost(input: UpdatePostInput): UpdatePostPayload
    deletePost(input: DeletePostInput): DeletePostPayload
    createReference(input: CreateReferenceInput): CreateReferencePayload
    updateReference(input: UpdateReferenceInput): UpdateReferencePayload
    deleteReference(input: DeleteReferenceInput): DeleteReferencePayload
    createUser(input: CreateUserInput): CreateUserPayload
    updateUser(input: UpdateUserInput): UpdateUserPayload
    deleteUser(input: DeleteUserInput): DeleteUserPayload
    createRole(input: CreateRoleInput): CreateRolePayload
    updateRole(input: UpdateRoleInput): UpdateRolePayload
    deleteRole(input: DeleteRoleInput): DeleteRolePayload
    # add Element to Test List
    addTestReferenceToTestReferenceList(input: AddTestReferenceToTestReferenceListInput): AddTestReferenceToTestReferenceListPayload
    # removes Element from Test List
    removeTestReferenceFromTestReferenceList(input: RemoveTestReferenceFromTestReferenceListInput): RemoveTestReferenceFromTestReferenceListPayload
    # add Element to Test List
    addTestReferenceToTestReferenceSet(input: AddTestReferenceToTestReferenceSetInput): AddTestReferenceToTestReferenceSetPayload
    # removes Element from Test List
    removeTestReferenceFromTestReferenceSet(input: RemoveTestReferenceFromTestReferenceSetInput): RemoveTestReferenceFromTestReferenceSetPayload
    # add Element to Test List
    addEntryToTestReferenceMap(input: AddEntryToTestReferenceMapInput): AddEntryToTestReferenceMapPayload
    # removes Element from Test List
    removeEntryFromTestReferenceMap(input: RemoveEntryFromTestReferenceMapInput): RemoveEntryFromTestReferenceMapPayload
    # add Element to Test List
    addStringToTestStringList(input: AddStringToTestStringListInput): AddStringToTestStringListPayload
    # removes Element from Test List
    removeStringFromTestStringList(input: RemoveStringFromTestStringListInput): RemoveStringFromTestStringListPayload
    # add Element to Test List
    addStringToTestStringSet(input: AddStringToTestStringSetInput): AddStringToTestStringSetPayload
    # removes Element from Test List
    removeStringFromTestStringSet(input: RemoveStringFromTestStringSetInput): RemoveStringFromTestStringSetPayload
    # add Element to Test List
    addEntryToTestStringMap(input: AddEntryToTestStringMapInput): AddEntryToTestStringMapPayload
    # removes Element from Test List
    removeEntryFromTestStringMap(input: RemoveEntryFromTestStringMapInput): RemoveEntryFromTestStringMapPayload
    # add Element to Test List
    addEmbeddedToTestEmbeddedList(input: AddEmbeddedToTestEmbeddedListInput): AddEmbeddedToTestEmbeddedListPayload
    # removes Element from Test List
    removeEmbeddedFromTestEmbeddedList(input: RemoveEmbeddedFromTestEmbeddedListInput): RemoveEmbeddedFromTestEmbeddedListPayload
    # add Element to Test List
    addEntryToTestEmbeddedMap(input: AddEntryToTestEmbeddedMapInput): AddEntryToTestEmbeddedMapPayload
    # removes Element from Test List
    removeEntryFromTestEmbeddedMap(input: RemoveEntryFromTestEmbeddedMapInput): RemoveEntryFromTestEmbeddedMapPayload
    # add Element to Test List
    addEntryToTestRefRefMap(input: AddEntryToTestRefRefMapInput): AddEntryToTestRefRefMapPayload
    # removes Element from Test List
    removeEntryFromTestRefRefMap(input: RemoveEntryFromTestRefRefMapInput): RemoveEntryFromTestRefRefMapPayload
    # add Element to Comment List
    addCommentToCommentComments(input: AddCommentToCommentCommentsInput): AddCommentToCommentCommentsPayload
    # removes Element from Comment List
    removeCommentFromCommentComments(input: RemoveCommentFromCommentCommentsInput): RemoveCommentFromCommentCommentsPayload
    # add Element to TestReference List
    addEntryToTestReferenceMap1(input: AddEntryToTestReferenceMap1Input): AddEntryToTestReferenceMap1Payload
    # removes Element from TestReference List
    removeEntryFromTestReferenceMap1(input: RemoveEntryFromTestReferenceMap1Input): RemoveEntryFromTestReferenceMap1Payload
    # add Element to TestReference List
    addEntryToTestReferenceMap2(input: AddEntryToTestReferenceMap2Input): AddEntryToTestReferenceMap2Payload
    # removes Element from TestReference List
    removeEntryFromTestReferenceMap2(input: RemoveEntryFromTestReferenceMap2Input): RemoveEntryFromTestReferenceMap2Payload
    # add Element to TestReference List
    addEntryToTestReferenceMap3(input: AddEntryToTestReferenceMap3Input): AddEntryToTestReferenceMap3Payload
    # removes Element from TestReference List
    removeEntryFromTestReferenceMap3(input: RemoveEntryFromTestReferenceMap3Input): RemoveEntryFromTestReferenceMap3Payload
    # add Element to Post List
    addCommentToPostComments(input: AddCommentToPostCommentsInput): AddCommentToPostCommentsPayload
    # removes Element from Post List
    removeCommentFromPostComments(input: RemoveCommentFromPostCommentsInput): RemoveCommentFromPostCommentsPayload
    # add Element to User List
    addCommentToUserComments(input: AddCommentToUserCommentsInput): AddCommentToUserCommentsPayload
    # removes Element from User List
    removeCommentFromUserComments(input: RemoveCommentFromUserCommentsInput): RemoveCommentFromUserCommentsPayload
    # add Element to User List
    addPostToUserPosts(input: AddPostToUserPostsInput): AddPostToUserPostsPayload
    # removes Element from User List
    removePostFromUserPosts(input: RemovePostFromUserPostsInput): RemovePostFromUserPostsPayload
    # add Element to Role List
    addUserToRoleUsers(input: AddUserToRoleUsersInput): AddUserToRoleUsersPayload
    # removes Element from Role List
    removeUserFromRoleUsers(input: RemoveUserFromRoleUsersInput): RemoveUserFromRoleUsersPayload
  }
`
export default typeDefs