const base64 = (i) => {
  return new Buffer(i, 'utf8').toString('base64')
}

const unbase64 = (i) => {
  return new Buffer(i, 'base64').toString('utf8');
}

export { base64, unbase64 }
