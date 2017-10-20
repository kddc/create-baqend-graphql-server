import { db as baqend } from 'baqend/lib'
import schema from '../schema.json'
const host = 'http://127.0.0.1:8080/v1'

const setup = () => {
  let emf = new baqend.EntityManagerFactory({ host })
  return emf.createEntityManager(true).ready().then((em) => {
    return em.User.login('root', 'root').then(() => {
      return em.send(new em.message.ReplaceAllSchemas(schema))
    })
  }).then((schema) => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000))
  })
}

setup()
