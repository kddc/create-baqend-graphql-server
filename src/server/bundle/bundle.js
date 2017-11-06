import { codeBlock } from 'common-tags'

const generateBundle = (opts, args) => {
  const {
    importDefinitions,
    definitions,
    graphqlDefinitionNames,
    graphqlDefinitions,
  } = args
  return codeBlock`
    import { graphql } from 'graphql'
    import { makeExecutableSchema } from 'graphql-tools'
    import { merge } from 'lodash'
    ${importDefinitions.join('\n')}
    ${definitions.join('\n')}
    ${graphqlDefinitions.join('\n')}

    const schema = makeExecutableSchema({
      typeDefs: [${graphqlDefinitionNames.typeDefs.join(',')}],
      resolvers: merge(${graphqlDefinitionNames.resolvers.join(',')}),
    })

    const collectBaqendHeaders = (connection) => {
      /* eslint-disable */
      const headers = {
        'max-age': [],
        'surrogate-keys': []
      }
      const app = '/' + connection._connector.host.replace('.app.baqend.com', '')
      connection.send = ((send) => (...args) => {
        args[0].request.headers = { ...args[0].request.headers, 'fastly-debug': '1' }
        return send.call(connection, ...args).then((response) => {
          const maxAge = response.headers['cache-control'].split(',')[1].split('=')[1] || 0
          headers['max-age'].push(maxAge)
          if (response.headers['surrogate-key']) {
            const surrogateKeys = response.headers['surrogate-key'].replace(new RegExp(app,"g"), '').split(' ')
            surrogateKeys.forEach((surrogateKey) => {
              if (surrogateKey && headers['surrogate-keys'].indexOf(surrogateKey) === -1) {
                headers['surrogate-keys'].push(surrogateKey)
              }
            })
          }
          return response
        })
      })(connection.send)
      /* eslint-enable */
      return headers
    }

    exports.get = function(db, req, res) {
      let query = req.query.query;
      let headers = collectBaqendHeaders(db);
      let baqendLoader = buildDataloaders({ db: db });
      let baqendResolver = new BaqendResolver({ db: db, loader: baqendLoader, api: 'relay' });
      let baqendMutator = new BaqendMutator({ db: db });
      return (0, _graphql.graphql)(schema, query, null, { baqendResolver, baqendMutator }).then(response => {
        response.extensions = headers;
        const maxAge = Math.min(...headers['max-age']);
        if (maxAge === 0) {
          res.set('cache-control', 'no-cache, no-store, max-age=0');
        } else {
          res.set('cache-control', \`public, max-age=\$\{maxAge\}\`);
          res.set('surrogate-key', headers['surrogate-keys'].join(' '));
        }
        res.json(response);
      });
    }

    exports.post = function(db, req, res) {
      let data = req.body
      let query = data.query
      let headers = collectBaqendHeaders(db)
      let baqendLoader = buildDataloaders({ db: db })
      let baqendResolver = new BaqendResolver({ db: db, loader: baqendLoader, api: 'relay' })
      let baqendMutator = new BaqendMutator({ db: db })
      let variables = data.variables
      let operationName = data.operationName
      return graphql(schema, query, null, { baqendResolver, baqendMutator }, variables, operationName).then((response) => {
        response.extensions = headers
        const maxAge = Math.min(...headers['max-age'])
        if (maxAge === 0) {
          res.set('cache-control', 'no-cache, no-store, max-age=0')
        } else {
          res.set('cache-control', \`public, max-age=\$\{maxAge\}\`)
          res.set('surrogate-key', headers['surrogate-keys'].join(' '))
        }
        res.json(response)
      })
    }
  `
}

export {
  generateBundle,
}
