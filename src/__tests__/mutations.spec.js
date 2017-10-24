import { graphql } from 'graphql'
import { db as baqend } from 'baqend/lib'

import schema from './_schema_.json'
import buildDataloaders from '../../.tmp/loader'
import BaqendResolver from '../server/util/BaqendResolver'
import BaqendMutator from '../server/util/BaqendMutator'
import executableSchema from './_helpers_/schema'

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
  // const baqendLoader = buildDataloaders({ db: db })
  const context = {
    baqendResolver: new BaqendResolver({ db, loader: buildDataloaders({ db }) }),
    baqendMutator: new BaqendMutator({ db }),
  }
  gql = query => graphql(executableSchema, query, null, context)
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
  
  test('it should return an object from a graphql query again', async () => {
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
