import { codeBlock } from 'common-tags'

/**
 * Generates the query field resolvers
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The field type definitions
 */
const relay = ({ name, embedded, abstract }) => {
  const definitions = []
  if (!(embedded || abstract)) {
    definitions.push(codeBlock`
      ${name}: (root, args, { baqendResolver }) => {
        return baqendResolver.resolveReferenceQuery('${name}', args, {})
      }
    `)
    definitions.push(codeBlock`
      all${name}s: (root, args, { baqendResolver }) => {
        return baqendResolver.resolveReferenceCollectionQuery('${name}', args, {})
      }
    `)
  }
  return definitions
}

const generateQueryFieldResolverDefinitions = (opts, args) => relay(args)

export default generateQueryFieldResolverDefinitions
