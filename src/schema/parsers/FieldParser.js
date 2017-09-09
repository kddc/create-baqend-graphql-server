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
      baqendType = baqendType.match(new RegExp('\\[.*\\]', 'ig'))[0].replace(/(\[|\])/g,'')
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
      default:
        return null
      // "DateTime",
      // "Date",
      // "Time",
      // "File",
      // "GeoPoint",
      // "JsonObject",
      // "JsonArray"
    }
  }

  static parseType(baqendType) {
    if (this.isPrimitive(baqendType)) {
      return {
        "superType": "scalar",
        "type": this.mapPrimitiveToScalar(baqendType)
      }
    } else if (this.isCollection(baqendType)) {
      return {
        "superType": "collection",
        "type": this.getType(baqendType)
      }
    }
    return {
      "superType": "object",
      "type": this.getType(baqendType)
    }
  }
}
