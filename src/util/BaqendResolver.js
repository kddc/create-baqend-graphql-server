import parseFilterInput from './parseFilterInput'
import parseSortByInput from './parseSortByInput'
import { base64, unbase64 } from './base64'

class BaqendResolver {
  constructor({ db, loader, api }) {
    this.db = db
    this.loader = loader
    this.api = api || 'simple'
  }

  resolveReference(type, id, args, context) {
    return this.loader[type].load(id)
  }

  resolveReferenceQuery(type, { id }, context) {
    return this.loader[type].load(id)
  }

  resolveReferenceCollection(type, ids, args, context) {
    if(ids && ids.length) {
      ids = ids || []
      args.filter = args.filter && {
        "and":  [
          { id: { "in": ids } },
          args.filter
        ]
      }
      return this.resolveCollectionQuery(type, args, context)
    } else {
      const total = 0
      const edges = []
      const pageInfo = this.getPageInfo()
      return {
        total,
        edges,
        pageInfo
      }
    }
  }

  resolveCollectionQuery(type, args, context) {
    const { first, after, last, before } = args
    const filter = args.filter ? args.filter : {}
    const sortBy = args.sortBy ? args.sortBy : { id: 'ASC' }

    const filterObject = parseFilterInput(Object.assign({}, filter))
    const sortByForwards = parseSortByInput(Object.assign({}, sortBy))
    const sortByBackwards = parseSortByInput(Object.assign({}, sortBy), true)

    const forwardPagination = this.isForwardPagination(first, after, last, before)
    const forwardCursor = forwardPagination && this.calculateForwardPaginationParams(first, after)
    const forwardEdges = forwardCursor && this.fetchEdges(type, filterObject, sortByForwards, forwardCursor) || []

    const backwardPagination = this.isBackwardPagination(first, after, last, before)
    const backwardCursor = backwardPagination && this.calculateBackwardPaginationParams(last, before)
    const backwardEdges = backwardCursor && this.fetchEdges(type, filterObject, sortByBackwards, backwardCursor) || []

    const total = this.getCount(type, filterObject)

    return Promise.all([ forwardEdges, backwardEdges, total ]).then(([ forwardEdges, backwardEdges, total ]) => {

      forwardEdges = forwardEdges.map((edge, index) => ({
        id: edge.id,
        cursor: this.createCursor((1 + forwardCursor.offset + index), total),
        edge: edge
      }))

      backwardEdges = backwardEdges.map((edge, index) => ({
        id: edge.id,
        cursor: this.createCursor((total - backwardCursor.offset - index), total),
        edge: edge
      })).reverse()

      const edges = this.mergeResults(forwardEdges, backwardEdges)
      const pageInfo = this.getPageInfo(edges, total, forwardCursor, backwardCursor)

      return {
        total,
        edges,
        pageInfo
      }
    })
  }

  fetchEdges(type, filter, sortBy, cursor) {
    return this.db[type].find()
      .where(filter)
      .sort(sortBy)
      .offset(cursor.offset)
      .limit(cursor.limit)
      .resultList()
      .then(resultList => {
        return resultList.map(resultEntity => resultEntity.toJSON())
      })
  }

  getCount(type, filter) {
    return this.db[type].find()
      .where(filter)
      .count()
  }

  getPageInfo(edges, total, forwardCursor, backwardCursor) {
    const forwardPrev = forwardCursor && forwardCursor.offset > 0 || false
    const forwardNext = forwardCursor && forwardCursor.offset + forwardCursor.limit < total || false
    const backwardPrev = backwardCursor && backwardCursor.offset + backwardCursor.limit < total || false
    const backwardNext = backwardCursor && backwardCursor.offset > 0 || false
    return {
      startCursor: edges && edges.length && edges[0]['cursor'] || null,
      endCursor: edges && edges.length && edges[edges.length - 1]['cursor'] || null,
      hasPreviousPage: backwardPrev || forwardPrev,
      hasNextPage: forwardNext || backwardNext
    }
  }

  isForwardPagination(first, after, last, before) {
    return ((!!first || !!after) || (!last && !before))
  }

  isBackwardPagination(first, after, last, before) {
    return (!!last || !!before)
  }

  calculateForwardPaginationParams(first, after) {
    const cursor = after && this.readCursor(after)
    const index = cursor && cursor.index || 0
    const total = cursor && cursor.total || 0
    const offset = index || 0
    const limit = first
    return { index, total, offset, limit }
  }

  calculateBackwardPaginationParams(last, before) {
    const cursor = before && this.readCursor(before)
    const index = cursor && cursor.index || 0
    const total = cursor && cursor.total || 0
    const offset = (total > 0 && index > 0) && (total - ( index - 1 )) || 0
    const limit = last
    return { index, total, offset, limit }
  }

  createCursor(index, total) {
    // return `index:${index};total:${total}`
    return base64(`index:${index};total:${total}`)
  }

  readCursor(cursor) {
    const string = unbase64(cursor)
    const args = string.split(';').map(arg => arg.split(':'))
    try {
      return {
        [args[0][0]]: parseInt(args[0][1]),
        [args[1][0]]: parseInt(args[1][1])
      }
    } catch(err) {
      throw "invalid cursor"
    }
  }

  mergeResults(a1, a2) {
     var hash = {};
     var arr = [];
     for (var i = 0; i < a1.length; i++) {
        if (hash[a1[i]['id']] !== true) {
          hash[a1[i]['id']] = true;
          arr[arr.length] = a1[i];
        }
     }
     for (var i = 0; i < a2.length; i++) {
        if (hash[a2[i]['id']] !== true) {
          hash[a2[i]['id']] = true;
          arr[arr.length] = a2[i];
        }
     }
     return arr;
  }

}

export default BaqendResolver
