import { codeBlock } from 'common-tags'

const generateLoader = (opts, args) => {
  const { loaders } = args
  return codeBlock`
    import DataLoader from 'dataloader'
    let batchRequest = (db, type, keys) => {
      return db[type].find()
        .where({ id: { $in: keys } })
        .resultList()
        .then(resultList => {
          return resultList.map(resultEntity => resultEntity.toJSON())
        })
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
  generateLoader
}
