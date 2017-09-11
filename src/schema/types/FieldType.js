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
    return [`{ ${this.name} }`, 'args', 'context'].join(', ')
  }

  getResolveStrategy() {
    let args = [`'${this.type}'`, this.name, 'args', 'context']
    switch(this.superType) {
      case 'object':
        return `resolveObjectTypeReference(${args.join(', ')})`
      case 'collection':
        return `resolveObjectTypeReferenceCollection(${args.join(', ')})`
      case 'scalar':
        return this.name
    }
  }

}
