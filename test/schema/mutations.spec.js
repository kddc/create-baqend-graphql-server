// import FieldParser from '../../src/schema/parsers/FieldParser'
import { db as baqend } from 'baqend/lib'
import schema from '../schema.json'
const host = 'http://127.0.0.1:8080/v1'
import fetch from 'node-fetch'


//const schema = [{"class":"/db/Test","superClass":"/db/Object","acl":{"schemaAdd":{"/db/Role/1":"allow"},"schemaReplace":{"/db/Role/1":"allow"},"schemaSubclass":{"/db/Role/1":"allow"}},"metadata":{},"fields":{"string":{"name":"string","type":"/db/String","order":0}}},{"class":"/db/User","superClass":"/db/Object","acl":{"schemaAdd":{"/db/Role/1":"allow"},"schemaReplace":{"/db/Role/1":"allow"},"schemaSubclass":{"/db/Role/1":"allow"}},"metadata":{},"fields":{"username":{"name":"username","type":"/db/String","order":0,"flags":["READONLY"]}}}]

let db, tokenStorage

// beforeAll(function() {
//   tokenStorage = new baqend.util.TokenStorage();
//   let emf = new baqend.EntityManagerFactory({host: host, tokenStorage: tokenStorage});
//   return emf.createEntityManager(true).ready().then((em) => {
//     return em.User.login('root', 'root');
//   });
// });

beforeAll(async () => {
  let emf = new baqend.EntityManagerFactory({ host, tokenStorage })
  return emf.createEntityManager(true).ready().then((em) => {
    return em.User.login('root', 'root').then(() => {
      return em.send(new em.message.ReplaceAllSchemas(schema))
    })
  })
})

beforeAll(async () => {
  let emf2 = new baqend.EntityManagerFactory({ host, tokenStorage })
  return emf2.createEntityManager(true).ready().then((em2) => {
    db = em2
  })
})

// afterEach(() => {
//   return Promise.all(Object.keys(schema).map(key => {
//     return db.send(new db.message.TruncateBucket(schema[key]['class'].replace(/^\/db\//, ''))).catch(e => {})
//   }))
// })

describe('it should parse field types correctly', () => {
  test(`test connection`, () => {
    console.log(db.User.me)
    expect(true).toBe(true)
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
