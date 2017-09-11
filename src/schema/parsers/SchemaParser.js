export default class SchemaParser {

  static parseSchema(schemaString) {
    let schema = JSON.parse(schemaString)
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
