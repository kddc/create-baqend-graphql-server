import generateFieldTypeDefinitions from './codegen/field/type'
import generateFieldInputDefinitions from './codegen/field/inputs'
import generateFieldConnectionTypeDefinitions from './codegen/field/connectionTypes'
import generateFieldFilterInputDefinitions from './codegen/field/filterInputs'
import generateFieldSortByInputDefinitions from './codegen/field/sortByInputs'
import generateFieldConnectionInputDefinitions from './codegen/field/connectionInputs'
// import { fieldInputDefinitions } from './defs/types/fields'
import generateFieldResolverDefinitions from './codegen/field/resolvers/resolver'

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
      elementType,
    }
  }

  isScalar() {
    return this.props.fieldType === 'scalar'
  }

  isCollection() {
    return this.props.fieldType === 'collection'
  }

  typeDefinitions(opts) {
    return generateFieldTypeDefinitions(opts, this.props)
  }

  connectionTypeDefinitions(opts) {
    return generateFieldConnectionTypeDefinitions(opts, this.props)
  }

  filterInputDefinitions(opts) {
    return generateFieldFilterInputDefinitions(opts, this.props)
  }

  sortByInputDefinitions(opts) {
    return generateFieldSortByInputDefinitions(opts, this.props)
  }

  inputDefinitions(opts) {
    return generateFieldInputDefinitions(opts, this.props)
  }

  connectionInputDefinitions(opts) {
    return generateFieldConnectionInputDefinitions(opts, this.props)
  }

  resolverDefinitions(opts) {
    return generateFieldResolverDefinitions(opts, this.props)
  }
}
