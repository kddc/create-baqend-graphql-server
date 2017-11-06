import { codeBlock } from 'common-tags'

const generateLoader = (opts, args) => {
  const { loaders } = args
  return codeBlock`
    import DataLoader from 'dataloader'
    let batchRequest = (db, type, keys) => {
      // return db[type].find()
      //   .where({ id: { $in: keys } })
      //   .resultList()
      //   .then(resultList => {
      //     return keys.map(key => {
      //       return resultList.find(entity => key == entity.id) || null
      //     })
      //   })
      return Promise.all(keys.map((key) => {
        return db[type].load(key, { refresh: true }).then(r => r && r.toJSON())
      }))
    }
    let buildDataloaders = ({ db }) => {
      return {
        ${loaders.map(loader => loader).join(',\n')}
      }
    }
    export default buildDataloaders
  `
}

export {
  generateLoader,
}
