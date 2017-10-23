import { codeBlock } from 'common-tags'

/**
 * Generates the object loader definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const generateLoaderDefinitions = (opts, { name, abstract, embedded }) => {
  const definitions = []

  if (!abstract && !embedded) {
    definitions.push(codeBlock`
      ${name}: new DataLoader(keys => batchRequest(db, '${name}', keys))
    `)
  }

  return definitions
}

export default generateLoaderDefinitions
