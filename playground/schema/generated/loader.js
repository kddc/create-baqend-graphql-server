let batchRequest = (db, type, keys) => {
  return db[type].find()
    .where({ id: { $in: keys } })
    .resultList()
    .then(resultList => {
      return resultList.map(resultEntity => resultEntity.toJSON())
    })
}
let buildDataloaders = ({ db, DataLoader }) => {
  return {
    Post: new DataLoader(keys => batchRequest(db, 'Post', keys)),
    User: new DataLoader(keys => batchRequest(db, 'User', keys))
  }
}
export default buildDataloaders