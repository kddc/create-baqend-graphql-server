import { codeBlock } from 'common-tags'

export default class TypeDefsGenerator {

  generateTypeDefs(types) {
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

}
