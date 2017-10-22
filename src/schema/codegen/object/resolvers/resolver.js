import { codeBlock } from 'common-tags'

/**
 * Generates the object resolver definitions
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
      ${name}: {
        ${fields.map(field => field).join(',\n')}
      }
    `)
  }
  return definitions
}

const generateResolverDefinitions = (opts, args) => relay(args)

export default generateResolverDefinitions
