export default class SchemaReader {

  static readSchema(schemaString) {
    let schema = this.parseSchema(schemaString)
    return this.stripSchema(schema)
  }

  static parseSchema(schemaString) {
    return JSON.parse(schemaString)
  }

  static stripSchema(schema) {
    return schema.map((type) => {
      return {
        "class": type["class"],
        "superClass": type["superClass"],
        "fields": Object.keys(type["fields"]).map((key) => {
           return {
             "name": type["fields"][key]["name"],
             "type": type["fields"][key]["type"]
           }
        })
      }
    })
  }
}
