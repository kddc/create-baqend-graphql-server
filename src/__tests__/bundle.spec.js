import { db as baqend } from 'baqend/lib'

import schema from './_schema_.json'

import bundle from './_helpers_/bundle'

// eslint-disable-next-line no-eval
eval(bundle)
const { post } = exports
const host = 'http://127.0.0.1:8080/v1'

let db
let gql

beforeEach(() => {
  const emf = new baqend.EntityManagerFactory({ host })
  return emf.createEntityManager().ready().then((em) => {
    db = em
    return db.User.login('root', 'root')
  })
})

beforeEach(() => {
  gql = query => new Promise(res => post(
    db,
    { body: { query } },
    { json: d => res(d) },
  ))
})

/* eslint-disable */
afterEach(() => {
  return Promise.all(Object.keys(schema).map((key) => {
    return db.send(new db.message.TruncateBucket(schema[key]['class'].replace(/^\/db\//, ''))).catch(e => {})
  }))
})
/* eslint-enable */

describe('GraphQL requests are working without errors', () => {
  test('it should return an object from a graphql query', async () => {
    await db.Test({ id: '1', string: 'bla' }).save()
    // language=GraphQL
    const query = `{
      Test(id: "/db/Test/1") {
        id
      }
    }`
    return gql(query).then(res => expect(res.data.Test.id).toBe('/db/Test/1'))
  })
})
