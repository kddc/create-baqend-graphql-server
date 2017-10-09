const parseSortByInput = (sortObject, reverse = false) => {
  Object.keys(sortObject).map(function(key) {
    if(reverse) {
      sortObject[key] = sortObject[key] == "ASC" ? -1 : 1
    } else {
      sortObject[key] = sortObject[key] == "ASC" ? 1 : -1
    }
  })
  return sortObject
}

export default parseSortByInput
