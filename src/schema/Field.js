import { codeBlock } from 'common-tags'

import FieldParser from './parsers/FieldParser'

import { fieldDefinitions, fieldInputDefinitions } from './defs/types/fields'
import { fieldResolvers } from './defs/resolvers/fields'

/**
* field name (posts, author, ...)
* field type (Post, Author, ...)
* field superType (collection, object, scalar)
*/
export default class Field {
  constructor({ name, fieldType, elementType }) {
    this.props = {
      name,
      fieldType,
      elementType
    }
  }

  isScalar() {
    return this.props.fieldType === 'scalar'
  }

  isCollection() {
    return this.props.fieldType === 'collection'
  }

  defs(opts) {
    return fieldDefinitions(opts, this.props)
  }

  resolvers(opts) {
    return fieldResolvers(opts, this.props)
  }

  inputDefs(opts) {
    return fieldInputDefinitions(opts, this.props)
  }

}
