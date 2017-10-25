const flatten = (inputArray) => {
  let arr
  arr = inputArray
    .reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
    .filter(n => n)
  arr = [...new Set(arr)]
  return arr
}

export default flatten
