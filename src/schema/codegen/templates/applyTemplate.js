import { codeBlock } from 'common-tags'
import * as resolvers from './resolvers'
import * as types from './types'

const templates = {
  ...resolvers,
  ...types
}

const applyTemplate = (templateName, args) => {
  return templates[templateName](args)
}

export default applyTemplate
