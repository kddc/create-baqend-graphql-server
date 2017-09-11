import { codeBlock } from 'common-tags'

import TypeParser from '../parsers/TypeParser'

import FieldType from './FieldType'
import QueryTypes from './QueryTypes'

export default class ObjectType {
  constructor(schemaObject) {
    this.name = TypeParser.getType(schemaObject['class'])
    this.type = TypeParser.getType(schemaObject['class'])
    this.fields = schemaObject.fields.map((field) => new FieldType({
      name: field.name,
      type: field.type
    }))
    this.queryTypes = new QueryTypes({
      name: this.name,
      type: this.type
    })
  }

  getQueryTypes() {
    return this.queryTypes
  }

  getTypeDef() {
    return codeBlock`
      type ${this.name} {
        ${this.fields.map((field) => field.getDef())}
      }
    `
  }
  getResolverDef() {
    let fields = this.fields.filter((field) => {
      return (field.superType === 'object' || field.superType === 'collection')
    })
    return codeBlock`
      ${this.name}: {
        ${fields.map((field) => {
          return field.getResolverDef()
        }).join('\n')}
      }
    `
  }

  getQueryTypeDefs() {
    return this.queryTypes.getTypeDefs()
  }

  getQueryTypeResolverDefs() {
    return this.queryTypes.getResolverDefs()
  }

}
