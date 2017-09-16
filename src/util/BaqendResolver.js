export default class BaqendResolver {
  constructor(db) {
    this.db = db
  }

  resolveReference(type, id, args, context) {
    return this.db[type].load(id)
  }

  resolveReferenceCollection(type, ids, args, context) {
    return ids.map((id) => {
      return this.resolveReference(type, id, null, context)
    })
  }

  resolveReferenceQuery(type, { id }, context) {
    return this.resolveReference(type, id, null, context)
  }

  resolveCollectionQuery(type, args, context) {
    return this.db[type].find().resultList().then((resultList) => {
      return resultList.map(resultEntity => resultEntity.toJSON())
    })
  }

}
