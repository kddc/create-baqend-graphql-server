import parseFilterInput from './parseFilterInput'
import parseSortByInput from './parseSortByInput'
import { base64, unbase64 } from './base64'
import { connectionFromArray } from 'graphql-relay'

class BaqendResolver {
  constructor({ db, loader, api }) {
    this.db = db
    this.loader = loader
    this.api = api || 'simple'
  }

  resolveMap(types, entries, context) {
    if(entries) {
      let resolvedKeys
      let resolvedValues
      if(types[0]) {
        resolvedKeys = this.resolveReferenceSet(types[0], Object.keys(entries), context)
      } else {
        resolvedKeys = this.resolveSet(Object.keys(entries), context)
      }
      if(types[1]) {
        resolvedValues = this.resolveReferenceSet(types[1], Object.keys(entries).map(key => entries[key]), context)
      } else {
        resolvedValues = this.resolveSet(Object.keys(entries).map(key => entries[key]), context)
      }
      return Promise.all([ resolvedKeys, resolvedValues ]).then(res => {
        return this.combine(res[0], res[1])
      })
    }
    return null
  }

  // Single Objects

  resolveReferenceQuery(type, { id }, context) {
    return this.resolveReference(type, id, context)
  }

  resolveReference(type, entity, context) {
    return this.loader[type].load(entity)
  }

  resolveNodeQuery({ id }, context) {
    const { type } = this.fromGlobalId(id)
    return this.resolveReference(type, id, context)
  }

  resolveNodeCollectionQuery({ ids }, context) {
    return ids.map((id) => {
      const { type } = this.fromGlobalId(id)
      return this.resolveReference(type, id, context)
    })
  }

  // Scalar Collections

  resolveList(entities, args) {
    const total = entities.length
    const { edges, pageInfo } = connectionFromArray(entities, args)
    return {
      total,
      edges,
      pageInfo
    }
  }

  resolveSet(entities, args) {
    return entities
  }

  // Reference Collections

  resolveReferenceList(type, entities, args, context) {
    const extendenArgs = args
    extendenArgs.filter = {
      and: [
        { id: { in: entities || [] } },
        args.filter || {},
      ],
    }
    return this.getEdges(type, extendenArgs, context)
  }

  resolveReferenceSet(type, entities, args, context) {
    return this.loader[type].loadMany(entities)
  }

  resolveReferenceCollectionQuery(type, args, context) {
    return this.getEdges(type, args, context)
  }

  getEdges(type, args, context) {
    const { first, after, last, before } = args
    let filter = args.filter ? args.filter : {}
    let sortBy = args.sortBy ? args.sortBy : { id: 'ASC' }

    const forwardPagination = this.isForwardPagination(first, after, last, before)
    const forwardCursor = forwardPagination && this.calculateForwardPaginationParams(first, after)
    const forwardEdges = forwardCursor && this.getEntities({
      type: type,
      filter: filter,
      sortBy: sortBy,
      cursor: forwardCursor
    }) || []

    const backwardPagination = this.isBackwardPagination(first, after, last, before)
    const backwardCursor = backwardPagination && this.calculateBackwardPaginationParams(last, before)
    const backwardEdges = backwardCursor && this.getEntities({
      type: type,
      filter: filter,
      sortBy: sortBy,
      cursor: backwardCursor,
      reverse: true
    }) || []

    const total = this.getCount({
      type,
      filter
    })

    return Promise.all([ forwardEdges, backwardEdges, total ]).then(([ forwardEdges, backwardEdges, total ]) => {
      forwardEdges = forwardEdges.map((node, index) => ({
        id: node.id,
        cursor: this.createCursor((1 + forwardCursor.offset + index), total),
        node: node
      }))

      backwardEdges = backwardEdges.map((node, index) => ({
        id: node.id,
        cursor: this.createCursor((total - backwardCursor.offset - index), total),
        node: node
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

  // helpers for querying the api and prepare the result

  getEntities({ type, filter, sortBy, cursor, reverse }) {
    const filterObject = parseFilterInput(Object.assign({}, filter))
    const sortByObject = parseSortByInput(Object.assign({}, sortBy), reverse)
    const offset = cursor && cursor.offset || undefined
    const limit = cursor && cursor.limit || undefined
    return this.db[type].find()
      .where(filterObject)
      .sort(sortByObject)
      .offset(offset)
      .limit(limit)
      .resultList()
      .then(resultList => {
        return resultList.map(resultEntity => resultEntity.toJSON())
      })
  }

  getCount({ type, filter }) {
    const filterObject = parseFilterInput(Object.assign({}, filter))
    return this.db[type].find()
      .where(filterObject)
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

  combine(keys, values) {
    var result = [];
    for (var i = 0; i < keys.length; i++) {
      result.push({
        key: keys[i],
        value: values[i]
      })
    }
    return result;
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

  fromGlobalId(id) {
    return {
      type: id.split('/')[2],
      id: id
    }
  }

}

export default BaqendResolver
