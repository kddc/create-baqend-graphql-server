import { codeBlock } from 'common-tags'

const loaderDefinitions = (opts, args) => {
  const { name } = args
  return codeBlock`
    ${name}: new DataLoader(keys => batchRequest(db, '${name}', keys))
  `
}

export {
  loaderDefinitions
}
