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
  static getSuperType(baqendType) {
    return baqendType.replace(new RegExp('(\\/db\\/|\\[.*\\])', 'ig'), '')
  }

  static getType(baqendType) {
    if(this.isCollection(baqendType)) {
      const baqendTypes = baqendType.match(new RegExp('\\[.*\\]', 'ig'))[0].replace(/(\[|\])/g,'').split(',')
      return baqendTypes.map(type => {
        return type.replace(new RegExp('\\/db\\/', 'i'), '')
      })
    }
    return baqendType.replace(new RegExp('\\/db\\/', 'i'), '')
  }

  static isPrimitive(baqendType) {
    const type = this.getSuperType(baqendType)
    return !!type.match(new RegExp('^(' + Primitives.join('|') + ')$','i'))
  }

  static isCollection(baqendType) {
    const type = this.getSuperType(baqendType)
    return !!type.match(new RegExp('^(' + Collections.join('|') + ')$','i'))
  }

  static mapPrimitiveToScalar(baqendType) {
    const type = this.getSuperType(baqendType)
    switch(type) {
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

  static parseType(baqendType) {
    if (this.isPrimitive(baqendType)) {
      return {
        "superType": "scalar",
        "type": this.mapPrimitiveToScalar(baqendType)
      }
    } else if (this.isCollection(baqendType)) {
      const type = this.getType(baqendType)
      const entryType = type[1] || type[0]
      return {
        "superType": "collection",
        "entryType": this.isPrimitive(entryType) && "scalar" || "object",
        "collectionType": this.getSuperType(baqendType).split('.')[1],
        "type": type
      }
    }
    return {
      "superType": "object",
      "type": this.getType(baqendType)
    }
  }
}
