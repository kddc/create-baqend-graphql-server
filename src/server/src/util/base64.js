const base64 = i => Buffer.from(i, 'utf8').toString('base64')

const unbase64 = i => Buffer.from(i, 'base64').toString('utf8')

export { base64, unbase64 }
