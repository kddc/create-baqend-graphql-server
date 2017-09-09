import { codeBlock } from 'common-tags'

const generateObjectTypeDefs = (types) => {
  return codeBlock`
  ${types.map((type) => {
    return codeBlock`
    type ${type.name} {
      ${type.fields.map((field) =>  `${field.name}: ${field.type}`)}
    }
    \n
    `
  }).join('\n')}
  `
}

export default generateObjectTypeDefs
