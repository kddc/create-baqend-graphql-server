import { codeBlock } from 'common-tags'

export default class QueryType {
  constructor({ name, args, type, superType }) {
    this.name = name
    this.args = args
    this.type = type
    this.superType = superType
  }

  getTypeDef() {
    return codeBlock`
      ${this.name}: ${this.superType === 'collection' ? '[' + this.type + ']' : this.type}
    `
  }

  getResolverDef() {
    let args = this.getArgs()
    let resolveStrategy = this.getResolveStrategy()
    return codeBlock`
      ${this.name}: (${args}) => {
        return ${resolveStrategy})
      }
    `
  }

  getArgs() {
    let callerArgs = ['root', 'args', 'context']
    return callerArgs.join(', ')
  }

  getResolveStrategy() {
    let args = [`'${this.type}'`, 'args', 'context']
    switch(this.superType) {
      case 'object':
        return `resolveObjectQuery(${args.join(', ')})`
      case 'collection':
        return `resolveCollectionQuery(${args.join(', ')})`
    }
  }

}
