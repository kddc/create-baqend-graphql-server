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
        return ${resolveStrategy}
      }
    `
  }

  getArgs() {
    let callerArgs = ['root', 'args', '{ baqendResolver }']
    return callerArgs.join(', ')
  }

  getResolveStrategy() {
    let args = [`'${this.type}'`, 'args', '{}']
    switch(this.superType) {
      case 'object':
        return `baqendResolver.resolveReferenceQuery(${args.join(', ')})`
      case 'collection':
        return `baqendResolver.resolveCollectionQuery(${args.join(', ')})`
    }
  }

}
