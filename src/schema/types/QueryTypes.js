import { codeBlock } from 'common-tags'
import QueryType from './QueryType'

export const templates = [
  {
    name: (type) => `${type}`,
    args: [
      { name: 'id', type: 'String' }
    ],
    superType: "object"
  },
  {
    name: (type) => `all${type}s`,
    args: [
      { name: 'first', type: 'Integer' },
      { name: 'last', type: 'Integer' }
    ],
    superType: "collection"
  }
]

export default class QueryTypes {
  constructor({ name, type }) {
    this.types = []
    templates.forEach((template) => {
      this.types.push(new QueryType({
        name: template.name(type),
        args: template.args,
        type: type,
        superType: template.superType
      }))
    })
  }

  getTypes() {
    return this.types
  }

  getTypeDefs() {
    return this.types.map((type) => {
      return type.getTypeDef()
    })
  }

  getResolverDefs() {
    return this.types.map((type) => {
      return type.getResolverDef()
    })
  }
}
