import { codeBlock } from 'common-tags'

/**
 * Generates the mutation field resolver definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The field type definitions
 */
const relay = ({ name, embedded, abstract }) => {
  const definitions = []
  if (!(embedded || abstract)) {
    definitions.push(codeBlock`
      create${name}: (root, args, { baqendMutator }) => {
        return baqendMutator.createEntity('${name}', args, {})
      }
    `)
    definitions.push(codeBlock`
      update${name}: (root, args, { baqendMutator }) => {
        return baqendMutator.updateEntity('${name}', args, {})
      }
    `)
    definitions.push(codeBlock`
      delete${name}: (root, args, { baqendMutator }) => {
        return baqendMutator.deleteEntity('${name}', args, {})
      }
    `)
  }
  return definitions
}

const generateMutationFieldResolverDefinitions = (opts, args) => relay(args)

export default generateMutationFieldResolverDefinitions
