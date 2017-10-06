const parseFilterInput = (filterObject, isPropertyLevel = true) => {
  const isLogicalLevel = Object.keys(filterObject).filter(property => property.match(/(and|or)/)).length ? true : false
  isPropertyLevel = isLogicalLevel ? false : isPropertyLevel
  if(isLogicalLevel) {
    Object.keys(filterObject).map(function(key) {
      filterObject[`$${key}`] = filterObject[key].map(filterObject => parseFilterInput(filterObject, true));
      delete filterObject[key]
    })
  } else if (isPropertyLevel) {
    Object.keys(filterObject).map(function(key) {
      filterObject[key] = parseFilterInput(filterObject[key], false)
    })
  } else {
    Object.keys(filterObject).map(function(key) {
      filterObject[`$${key}`] = filterObject[key]
      delete filterObject[key]
    })
  }
  return filterObject
}

const parseSortByInput = (sortObject) => {
  Object.keys(sortObject).map(function(key) {
    sortObject[key] = sortObject[key] == "ASC" ? 1 : -1
  })
  return sortObject
}

export default class BaqendResolver {
  constructor(db) {
    this.db = db
  }

  resolveReference(type, id, args, context) {
    return this.db[type].load(id).then(entity => entity.toJSON())
  }

  resolveReferenceCollection(type, ids, args, context) {
    return Promise.all(ids.map((id) => {
      return this.resolveReference(type, id, null, context)
    }))
  }

  resolveReferenceQuery(type, { id }, context) {
    return this.resolveReference(type, id, null, context)
  }

  resolveCollectionQuery(type, args, context) {
    const { filter, sortBy } = args
    const filterObject = filter && parseFilterInput(filter) || {}
    const sortByObject = sortBy && parseSortByInput(sortBy) || {}
    console.log(filterObject, sortByObject)
    return Promise.all([
      this.db[type]
        .find()
        .where(filterObject)
        .sort(Object.assign({}, sortByObject))
        .limit(2)
        .resultList().then(resultList => {
          return resultList.map(resultEntity => resultEntity.toJSON())
        }),
      this.db[type]
        .find()
        .where(filterObject)
        .sort(Object.assign({}, sortByObject))
        .limit(2)
        .count()
    ]).then(results => ({
      edges: results[0],
      info: results[1],
    }))
  }

}
