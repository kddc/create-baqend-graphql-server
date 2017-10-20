const flatten = (arr) => {
  arr = arr
    .reduce(
      (acc, val) => acc.concat(
        Array.isArray(val) ? flatten(val) : val
      ),[])
    .filter(n => n)
  arr = [ ...new Set(arr) ]
  return arr
}

export default flatten
