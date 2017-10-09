import { codeBlock } from 'common-tags'

const pageInfoType = codeBlock`
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }
`

const connectionTypes = [
  pageInfoType
]

export {
  connectionTypes
}
