import { codeBlock } from 'common-tags'

/**
 * Generates the mutation field definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The field type definitions
 */
const relay = ({ name, embedded, abstract }) => {
  const definitions = []
  if (!(embedded || abstract)) {
    definitions.push(codeBlock`
      create${name}(input: Create${name}Input): Create${name}Payload
    `)
    definitions.push(codeBlock`
      update${name}(input: Update${name}Input): Update${name}Payload
    `)
    definitions.push(codeBlock`
      delete${name}(input: Delete${name}Input): Delete${name}Payload
    `)
  }
  return definitions
}

const generateMutationFieldDefinitions = (opts, args) => relay(args)

export default generateMutationFieldDefinitions
