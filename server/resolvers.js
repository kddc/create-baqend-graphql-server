exports.resolveObjectTypeReference = function(referenceType, referenceId, args, { db }) {
  return db[referenceType]
          .load(referenceId)
}

exports.resolveTypeReferenceCollection = function(referenceType, referenceIds, args, context) {
  return referenceIds
          .map((referenceId) => resolveReference(referenceType, referenceId, null, context))
}

exports.resolveObjectQuery = function(referenceType, { id }, { db }) {
  return resolveTypeReference(referenceType, id, null, { db })
}

exports.resolveCollectionQuery = function(referenceType, args, { db }) {
  return db[referenceType]
          .find()
          .resultList()
          .then(resultList => resultList.map(resultEntity => resultEntity.toJSON()))
}
