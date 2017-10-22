import { codeBlock } from 'common-tags'

/**
 * Generates the mutation payload resolver definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({
  name,
  fields,
}) => {
  const definitions = []
  if (fields && fields.length) {
    definitions.push(codeBlock`
      Create${name}Payload: {
        ${fields.map(field => field).join(',\n')}
      }
    `)
    definitions.push(codeBlock`
      Update${name}Payload: {
        ${fields.map(field => field).join(',\n')}
      }
    `)
  }
  return definitions
}

const generatePayloadResolverDefinitions = (opts, args) => relay(args)

export default generatePayloadResolverDefinitions
