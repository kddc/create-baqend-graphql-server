import { codeBlock } from 'common-tags'
import * as resolvers from './resolvers'

const templates = {
  ...resolvers
}

const applyTemplate = (templateName, callerArgs, resolverArgs) => {
  return templates[templateName](callerArgs.join(', '), resolverArgs.join(', '))
}

export default applyTemplate
