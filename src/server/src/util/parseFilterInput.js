const parseFilterInput = (inputFilterObject, propertyLevel = true) => {
  const filterObject = { ...inputFilterObject }
  const isMongoKey = !!Object.keys(filterObject).filter(property => property.match(/(nearSphere)/)).length
  const isLogicalLevel = !!Object.keys(filterObject).filter(property => property.match(/(and|or|$and|$or)/)).length
  const isPropertyLevel = isLogicalLevel ? false : propertyLevel
  if (isLogicalLevel) {
    Object.keys(filterObject).forEach((key) => {
      filterObject[`$${key.replace('$', '')}`] = filterObject[key].map((childFilterObject) => {
        return parseFilterInput(childFilterObject, true)
      })
      delete filterObject[key]
    })
  } else if (isMongoKey) {
    Object.keys(filterObject).forEach((key) => {
      filterObject[`$${key.replace('$', '')}`] = parseFilterInput(filterObject[key], false)
      delete filterObject[key]
    })
  } else if (isPropertyLevel) {
    Object.keys(filterObject).forEach((key) => {
      filterObject[key] = parseFilterInput(filterObject[key], false)
    })
  } else {
    Object.keys(filterObject).forEach((key) => {
      filterObject[`$${key.replace('$', '')}`] = filterObject[key]
      delete filterObject[key]
    })
  }
  return filterObject
}

export default parseFilterInput
