const parseFilterInput = (filterObject, isPropertyLevel = true) => {
  filterObject = Object.assign({}, filterObject)
  const isLogicalLevel = Object.keys(filterObject).filter(property => property.match(/(and|or|$and|$or)/)).length ? true : false
  isPropertyLevel = isLogicalLevel ? false : isPropertyLevel
  if(isLogicalLevel) {
    Object.keys(filterObject).map(function(key) {
      filterObject[`$${key.replace('$','')}`] = filterObject[key].map(filterObject => parseFilterInput(filterObject, true));
      delete filterObject[key]
    })
  } else if (isPropertyLevel) {
    Object.keys(filterObject).map(function(key) {
      filterObject[key] = parseFilterInput(filterObject[key], false)
    })
  } else {
    Object.keys(filterObject).map(function(key) {
      filterObject[`$${key.replace('$','')}`] = filterObject[key]
      delete filterObject[key]
    })
  }
  return filterObject
}

export default parseFilterInput
