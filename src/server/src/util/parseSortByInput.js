const parseSortByInput = (inputSortObject, reverse = false) => {
  const sortObject = { ...inputSortObject }
  Object.keys(sortObject).forEach((key) => {
    if (reverse) {
      sortObject[key] = sortObject[key] === 'ASC' ? -1 : 1
    } else {
      sortObject[key] = sortObject[key] === 'ASC' ? 1 : -1
    }
  })
  return sortObject
}

export default parseSortByInput
