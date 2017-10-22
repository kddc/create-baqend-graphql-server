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
  fields,
}) => {
  const definitions = []
  if (!abstract) {
    if (embedded) {
      definitions.push(codeBlock`
        input ${name}Input {
          ${fields}
        }
      `)
    } else {
      definitions.push(codeBlock`
        input ${name}Input {
          id: ID
          ${fields}
        }
      `)
      definitions.push(codeBlock`
        input Create${name}Input {
          clientMutationId: String!
          id: ID
          ${fields}
        }
      `)
      definitions.push(codeBlock`
        input Update${name}Input {
          clientMutationId: String!
          id: ID!
          ${fields}
        }
      `)
      definitions.push(codeBlock`
        input Delete${name}Input {
          clientMutationId: String!
          id: ID!
        }
      `)
    }
  }
  return definitions
}

const generateInputDefinitions = (opts, args) => relay(args)

export default generateInputDefinitions
