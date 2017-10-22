import { codeBlock } from 'common-tags'

/**
 * Generates the query field definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The field type definitions
 */
const relay = ({ name, embedded, abstract }) => {
  const definitions = []
  if (!(embedded || abstract)) {
    const objectQueryArgs = [
      'id: ID!',
    ].join(', ')
    const connectionQueryArgs = [
      'first: Int',
      'after: String',
      'last: Int',
      'before: String',
    ].join(', ')

    definitions.push(codeBlock`
      ${name}(${objectQueryArgs}): ${name}
    `)
    definitions.push(codeBlock`
      all${name}s(filter: ${name}Filter, sortBy: ${name}SortBy, ${connectionQueryArgs}): ${name}Connection
    `)
  }
  return definitions
}

const generateQueryFieldDefinitions = (opts, args) => relay(args)

export default generateQueryFieldDefinitions
