const combine = (keys, values) => {
  const result = []
  for (let i = 0; i < keys.length; i += 1) {
    result.push({
      key: keys[i],
      value: values[i],
    })
  }
  return result
}

const mergeResults = (a1, a2) => {
  const hash = {}
  const arr = []
  for (let i = 0; i < a1.length; i += 1) {
    if (hash[a1[i].id] !== true) {
      hash[a1[i].id] = true
      arr[arr.length] = a1[i]
    }
  }
  for (let i = 0; i < a2.length; i += 1) {
    if (hash[a2[i].id] !== true) {
      hash[a2[i].id] = true
      arr[arr.length] = a2[i]
    }
  }
  return arr
}

export { combine, mergeResults }
