export const Primitives = [
  "String",
  "Integer",
  "Double",
  "Boolean",
  "DateTime",
  "Date",
  "Time",
  "File",
  "GeoPoint",
  "JsonObject",
  "JsonArray"
]

export const Collections = [
  "collection.List",
  "collection.Set",
  "collection.Map"
]

export default class FieldParser {
  constructor(types) {
    this.types = types
  }


  parseField({ name, type, flags }) {
    const fieldType = this.getFieldType({ type })
    const elementType = this.parseType({ name, type })
    const readOnly = this.isReadOnly({ flags })
    return {
      name,
      fieldType,
      elementType,
      readOnly
    }
  }

  getFieldType({ type }) {
    if(this.isPrimitive({ type })) {
      return "scalar"
    } else if (this.isCollection({ type })) {
      return "collection"
    } else if (this.isReference({ type })) {
      return "reference"
    } else if (this.isEmbedded({ type })) {
      return "embedded"
    }
  }

  parseType({ name, type }) {
    if(this.isPrimitive({ type })) {
      return this.parseScalarType({ name, type })
    } else if (this.isReference({ type }) || this.isEmbedded({ type })) {
      return this.parseObjectType({ type })
    } else if (this.isCollection({ type })) {
      return this.parseCollectionType({ type })
    }
    return null
  }

  parseScalarType({ name, type }) {
    if(name && name == 'id') {
      return "ID"
    }
    switch(type.replace(new RegExp('\\[.*\\]', 'ig'), '')) {
      case "GeoPoint":
      case "String":
        return "String"
      case "Integer":
        return "Int"
      case "Double":
        return "Float"
      case "Boolean":
        return "Boolean"
      case "DateTime":
      case "Date":
      case "Time":
        return "Date"
      case "JsonObject":
      case "JsonArray":
        return "JSON"
      default:
        return null
      // "File",
      // "GeoPoint"
    }
  }

  parseObjectType({ type }) {
    return type.replace(new RegExp('\\[.*\\]', 'i'), '')
  }

  parseCollectionType({ type }) {
    const collectionType = type.replace(new RegExp('\\[.*\\]', 'i'), '').split('.')[1]
    const types = type.match(new RegExp('\\[.*\\]', 'ig'))[0].replace(/(\[|\])/g,'').split(',').map(type => {
      const collectionElementType = type.replace(new RegExp('\\/db\\/', 'i'), '')
      return {
        fieldType: this.getFieldType({ type: collectionElementType }),
        elementType: this.parseType({ type: collectionElementType })
      }
    })
    return {
      collectionType,
      types
    }
  }

  isReadOnly({ flags }) {
    return flags && !!(flags.filter(flag => flag == 'READONLY').length) || false
  }

  isPrimitive({ type }) {
    return !!type.match(new RegExp('^(' + Primitives.join('|') + ')$','i'))
  }

  isCollection({ type }) {
    return !!type.match(new RegExp('^(' + Collections.join('|') + ')\\[.*\\]$','i'))
  }

  isReference({ type }) {
    return !!type.match(new RegExp('^(' + this.types['reference'].join('|') + ')$','i'))
  }

  isEmbedded({ type }) {
    return !!type.match(new RegExp('^(' + this.types['embedded'].join('|') + ')$','i'))
  }
}
