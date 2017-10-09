import { codeBlock } from 'common-tags'

import FieldParser from './parsers/FieldParser'

import { fieldDefinitions } from './defs/types/field'
import { fieldResolvers } from './defs/resolvers/field'

/**
* field name (posts, author, ...)
* field type (Post, Author, ...)
* field superType (collection, object, scalar)
*/
export default class Field {
  constructor({ name, type }) {
    this.props = {
      name: name,
      type: name == 'id' ? "ID" : FieldParser.parseType(type).type,
      superType: FieldParser.parseType(type).superType
    }
  }

  isScalar() {
    return !(this.props.superType === 'object' || this.props.superType === 'collection')
  }

  defs(opts) {
    return fieldDefinitions(opts, this.props)
  }

  resolvers(opts) {
    return fieldResolvers(opts, this.props)
  }

}
