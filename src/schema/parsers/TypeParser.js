export const Collections = [
  "collection.List",
  "collection.Set",
  "collection.Map"
]

export default class TypeParser {

  static getType(baqendType) {
    if(this.isCollection(baqendType)) {
      baqendType = baqendType.match(new RegExp('\\[.*\\]', 'ig'))[0].replace(/(\[|\])/g,'')
    }
    return baqendType.replace(new RegExp('\\/db\\/', 'i'), '')
  }

  static getSuperType(baqendType) {
    return baqendType.replace(new RegExp('(\\/db\\/|\\[.*\\])', 'ig'), '')
  }

  static isCollection(baqendType) {
    const type = this.getSuperType(baqendType)
    return !!type.match(new RegExp('^(' + Collections.join('|') + ')$','i'))
  }

}
