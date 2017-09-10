import { codeBlock } from 'common-tags'
import applyTemplate from '../templates/applyTemplate'

const generateObjectTypeDefs = (types) => {
  return codeBlock`
  ${types.map((type) => {
    return codeBlock`
    type ${type.name} {
      ${type.fields.map((field) =>  applyTemplate('objectType', field))}
    }
    \n
    `
  }).join('\n')}
  `
}

export default generateObjectTypeDefs
