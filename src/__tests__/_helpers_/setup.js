import { db as baqend } from 'baqend/lib'
import schema from '../_schema_.json'
import generateGraphQLDefs from '../../index'

const host = 'http://127.0.0.1:8080/v1'

const setupDatabase = () => {
  const emf = new baqend.EntityManagerFactory({ host })
  /* eslint-disable */
  return emf.createEntityManager(true).ready().then((em) => {
    return em.User.login('root', 'root').then(() => {
      return em.send(new em.message.ReplaceAllSchemas(schema))
    })
  }).then((schema) => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000))
  })
  /* eslint-enable */
}

const setupGraphQL = () => {
  generateGraphQLDefs({
    file: 'src/__tests__/_schema_.json',
    dest: '.tmp',
    schema: false,
  })
}

const setup = () => {
  setupDatabase()
  setupGraphQL()
}

setup()
