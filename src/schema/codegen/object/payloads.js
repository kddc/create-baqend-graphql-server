import { codeBlock } from 'common-tags'

/**
 * Generates the object input definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({
  name,
  abstract,
  embedded,
  parentFields,
  fields,
}) => {
  const definitions = []
  if (!(embedded || abstract)) {
    definitions.push(codeBlock`
      type Create${name}Payload {
        clientMutationId: String!
        ${parentFields}
        ${fields}
      }
    `)
    definitions.push(codeBlock`
      type Update${name}Payload {
        clientMutationId: String!
        ${parentFields}
        ${fields}
      }
    `)
    definitions.push(codeBlock`
      type Delete${name}Payload {
        clientMutationId: String!
        id: ID!
      }
    `)
  }
  return definitions
}

const generatePayloadDefinitions = (opts, args) => relay(args)

export default generatePayloadDefinitions
