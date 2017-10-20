import { codeBlock } from 'common-tags'

/**
 * Generates the Relay object type definitions
 */
const relay = ({
  name,
  abstract,
  embedded,
  parent,
  parentFields,
  fields,
}) => {
  const definitions = []
  const schemaType = abstract ? 'interface' : 'type'

  if (!abstract && !embedded) {
    const definition = codeBlock`
      ${schemaType} ${name} implements Node${(parent && `, ${parent}`) || ''} {
        ${parentFields.map(field => field)}
        ${fields.map(field => field)}
      }
    `
    definitions.push(definition)
  } else {
    const definition = codeBlock`
      ${schemaType} ${name} {
        ${fields.map(field => field)}
      }
    `
    definitions.push(definition)
  }
  return definitions
}

/**
 * Generates the object type definitions to resolve the object references
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const generateObjectTypeDefinitions = (opts, args) => relay(args)

export default generateObjectTypeDefinitions
