import DataLoader from 'dataloader'
let batchRequest = (db, type, keys) => {
  return db[type].find()
    .where({ id: { $in: keys } })
    .resultList()
    .then(resultList => {
      return keys.map(key => {
        return resultList.find(entity => key == entity.id) || null
      })
    })
}
let buildDataloaders = ({ db }) => {
  return {
    Test: new DataLoader(keys => batchRequest(db, 'Test', keys)),
    Comment: new DataLoader(keys => batchRequest(db, 'Comment', keys)),
    Device: new DataLoader(keys => batchRequest(db, 'Device', keys)),
    TestReference: new DataLoader(keys => batchRequest(db, 'TestReference', keys)),
    Post: new DataLoader(keys => batchRequest(db, 'Post', keys)),
    Reference: new DataLoader(keys => batchRequest(db, 'Reference', keys)),
    User: new DataLoader(keys => batchRequest(db, 'User', keys)),
    Role: new DataLoader(keys => batchRequest(db, 'Role', keys))
  }
}
export default buildDataloaders