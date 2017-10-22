import { codeBlock } from 'common-tags'

/**
 * Generates the object connection definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({ name, abstract }) => {
  const definitions = []
  if (!abstract) {
    definitions.push(codeBlock`
      ${name}Connection: {
        edges: ({ edges }, args, { baqendResolver }) => {
          return edges
        },
        pageInfo: ({ pageInfo }, args, { baqendResolver }) => {
          return pageInfo
        }
      }
    `)
    definitions.push(codeBlock`
      ${name}Edge: {
        cursor: ({ cursor }, args, { baqendResolver }) => {
          return cursor
        },
        node: ({ node }, args, { baqendResolver }) => {
          return node
        }
      }
    `)
  }
  return definitions
}

const generateConnectionResolverDefinitions = (opts, args) => relay(args)

export default generateConnectionResolverDefinitions
