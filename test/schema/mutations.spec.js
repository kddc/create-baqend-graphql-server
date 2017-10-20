// import FieldParser from '../../src/schema/parsers/FieldParser'
import { db as baqend } from 'baqend/lib'
import schema from '../schema.json'
const host = 'http://127.0.0.1:8080/v1'

import executableSchema from '../schema'

let db, tokenStorage

// beforeAll(() => {
//   let emf = new baqend.EntityManagerFactory({ host })
//   return emf.createEntityManager(true).ready().then((em) => {
//     return em.User.login('root', 'root').then(() => {
//       return em.send(new em.message.ReplaceAllSchemas(schema))
//     })
//   }).then((schema) => {
//     return new Promise((resolve) => setTimeout(() => resolve(), 1000))
//   })
// })

beforeAll(() => {
  let emf = new baqend.EntityManagerFactory({ host })
  return emf.createEntityManager(true).ready().then((em) => {
    db = em
    return db.User.login('root', 'root')
  })
})

// afterEach(() => {
//   return Promise.all(Object.keys(schema).map(key => {
//     return db.send(new db.message.TruncateBucket(schema[key]['class'].replace(/^\/db\//, ''))).catch(e => {})
//   }))
// })

describe('it should parse field types correctly', () => {
  test(`test connection`, () => {
    console.log(db.User.me.username)
    expect(db.User.me.username).toBe('root')
    // expect(db.isReady).toBe(true)
    // expect(db.User.me.username).toBe('root')
    var bla = new db.Test({string: "bla"})
    // bla.save().then(res => console.log(res.toJSON()))
  });
})

// describe('it should insert an object', () => {
//   test(`test connection`, () => {
//     expect(true).toBe(true)
//     // const obj = new db.Test({ id: "123", string: "bla" })
//     // obj.save()
//     // expect(db.isReady).toBe(true)
//     // expect(db.User.me.username).toBe('root')
//   });
// })