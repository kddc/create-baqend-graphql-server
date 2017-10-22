import { codeBlock } from 'common-tags'

/**
 * Generates the object connection definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({ name, type, abstract }) => {
  const definitions = []
  if (!abstract) {
    definitions.push(codeBlock`
      type ${name}Connection {
        total: Int
        edges: [${name}Edge]
        pageInfo: PageInfo!
      }
    `)
    definitions.push(codeBlock`
      type ${name}Edge {
        cursor: String!
        node: ${name}
      }
    `)
  }
  return definitions
}

const generateConnectionTypeDefinitions = (opts, args) => relay(args)

export default generateConnectionTypeDefinitions
