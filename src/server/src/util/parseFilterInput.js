const keywords = [
  'and', 'or',
  'eq', 'ne', 'in', 'nin', 'exists', 'gt', 'gte', 'lt', 'lte', 'regex',
  'nearSphere', 'geometry', 'maxDistance'
]

const parseFilterInput = (inputFilterObject) => {
  const filterObject = inputFilterObject
  if (typeof filterObject === 'object') {
    Object.keys(filterObject).forEach((key) => {
      if (keywords.indexOf(key) !== -1) {
        filterObject[`$${key}`] = parseFilterInput(filterObject[key])
        delete filterObject[key]
      } else {
        filterObject[key] = parseFilterInput(filterObject[key])
      }
    })
  }
  return filterObject
}

export default parseFilterInput
