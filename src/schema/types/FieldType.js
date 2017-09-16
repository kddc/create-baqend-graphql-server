import { codeBlock } from 'common-tags'

import FieldParser from '../parsers/FieldParser'

export default class FieldType {
  constructor({ name, type }) {
    this.name = name
    this.type = FieldParser.parseType(type).type
    this.superType = FieldParser.parseType(type).superType
  }

  getDef() {
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
    return [`{ ${this.name} }`, 'args', '{ baqendResolver }'].join(', ')
  }

  getResolveStrategy() {
    let args = [`'${this.type}'`, this.name, 'args', '{}']
    switch(this.superType) {
      case 'object':
        return `baqendResolver.resolveReference(${args.join(', ')})`
      case 'collection':
        return `baqendResolver.resolveReferenceCollection(${args.join(', ')})`
      case 'scalar':
        return this.name
    }
  }

}
