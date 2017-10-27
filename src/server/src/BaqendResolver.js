/* eslint-disable no-unused-vars, class-methods-use-this */
import { connectionFromArray } from 'graphql-relay'
import parseFilterInput from './util/parseFilterInput'
import parseSortByInput from './util/parseSortByInput'
import { base64, unbase64 } from './util/base64'
import { combine, mergeResults } from './util/helpers'

class BaqendResolver {
  constructor({ db, loader, api }) {
    this.db = db
    this.loader = loader
    this.api = api || 'simple'
  }

  // Queries
  resolveNodeQuery({ id }, context) {
    const { type } = this.fromGlobalId(id)
    return this.resolveReference(type, id, context)
  }

  resolveReferenceQuery(type, { id }, context) {
    return this.resolveReference(type, id, context)
  }

  resolveNodeCollectionQuery({ ids }, context) {
    return ids.map((id) => {
      const { type } = this.fromGlobalId(id)
      return this.resolveReference(type, id, context)
    })
  }

  resolveReferenceCollectionQuery(type, args, context) {
    return this.fetchEntities(type, args, context)
  }

  // Single Objects
  resolveReference(type, entity, context) {
    return this.loader[type].load(entity)
  }

  // Scalar Collections
  resolveList(entities, args) {
    const total = entities.length
    const { edges, pageInfo } = connectionFromArray(entities, args)
    return {
      total,
      edges,
      pageInfo,
    }
  }

  resolveSet(entities, args) {
    return entities
  }

  // Reference Collections
  resolveReferenceSet(type, entities, args, context) {
    return entities && this.loader[type].loadMany(entities)
  }

  resolveReferenceList(type, entities, args, context) {
    // const extendenArgs = args
    // extendenArgs.filter = {
    //   and: [
    //     { id: { in: entities || [] } },
    //     args.filter || {},
    //   ],
    // }
    // return this.fetchEntities(type, extendenArgs, context)
    return entities && this.loader[type].loadMany(entities).then(resolved => this.resolveList(resolved, args))
  }

  // Maps
  resolveMap(types, entries, context) {
    if (entries) {
      let resolvedKeys
      let resolvedValues
      if (types[0]) {
        resolvedKeys = this.resolveReferenceSet(types[0], Object.keys(entries), context)
      } else {
        resolvedKeys = this.resolveSet(Object.keys(entries), context)
      }
      if (types[1]) {
        resolvedValues = this.resolveReferenceSet(types[1], Object.keys(entries).map(key => entries[key]), context)
      } else {
        resolvedValues = this.resolveSet(Object.keys(entries).map(key => entries[key]), context)
      }
      return Promise.all([resolvedKeys, resolvedValues]).then((res) => {
        return combine(res[0], res[1])
      })
    }
    return null
  }

  /**
   * Resolves a GraphQL query compatible to the Relay specs
   * * Gets the total number of objects matching this query
   * * Fetches entities for forward navigation (default)
   * * Fetches entities for backward navigation (if args.last or args.before is set)
   * * Creates a PageInfo object according to the Relay specs
   *
   * @param {String} type The Baqend entity class
   * @param {Object} args - Query params from the graphql resolver
   * @param {Object} args.filter - filter arguments
   * @param {Object} args.sortBy - sorting argumnets
   * @param {Number} args.first - limit for forward navigation
   * @param {String} args.after - 'cursor' for forward navigation
   * @param {Number} args.last - limit for backward navigation
   * @param {String} args.before - 'cursor' for backward navigation
   * @param {Object} context - context object from graphql query
   *
   * @returns {Object} entities - The query result object
   * @returns {Number} entities.total - Total number of matching objects
   * @returns {Array} entities.edges - The edges array
   * @returns {Object} entities.pageInfo - The pageInfo object
   */
  fetchEntities(type, args, context) {
    const {
      first, after, last, before,
    } = args

    const filter = args.filter ? args.filter : {}
    const sortBy = args.sortBy ? args.sortBy : { id: 'ASC' }

    return this.getCount({ type, filter }).then((total) => {
      const forwardPaginationEntities = this.forwardPaginationEntities({
        type, filter, sortBy, first, after, last, before, total,
      })
      const backwardPaginationEntities = this.backwardPaginationEntities({
        type, filter, sortBy, first, after, last, before, total,
      })
      return Promise.all([forwardPaginationEntities, backwardPaginationEntities]).then((results) => {
        const edges = mergeResults(results[0], results[1])
        const pageInfo = this.getPageInfo(edges, total, first, after, last, before)
        return {
          total, edges, pageInfo,
        }
      })
    })
  }

  /**
   * Fetches the entities for forward pagination queries
   *
   * @param {Object} args - Query params from the BaqendResolver.fetchEntities
   * @param {Number} args.total - total number of matching entities
   *
   * @returns {Object} forward - The query result for forward Pagination
   * @returns {Array} forward.forwardEdges - Edges array with with node objects for Relay.
   * The nodes contain an extra id property for getting merged with the backwards edges
   * @returns {Object} forward.forwardParams - The calculated offset/limit params used for the query for
   * the calculation of the pageInfo object
   */
  forwardPaginationEntities({
    type, filter, sortBy, first, after, last, before, total,
  }) {
    const forwardPagination = this.isForwardPagination(first, after, last, before)
    if (forwardPagination) {
      const { forward: offset } = this.readCursor(after)
      return this.doFetch({
        filter: parseFilterInput({ ...filter }),
        sortBy: parseSortByInput({ ...sortBy }),
        limit: first,
        offset,
        type,
      }).then(res => res.map((node, index) => {
        const { id } = node
        const cursor = this.createCursor({
          total, index, offset,
        })
        return {
          id,
          cursor,
          node,
        }
      }))
    }
    return []
  }

  /**
   * Fetches the entities for backward pagination queries
   *
   * @param {Object} args - Query params from the BaqendResolver.fetchEntities
   * @param {Number} args.total - total number of matching entities
   *
   * @returns {Object} backward - The query result for forward Pagination
   * @returns {Array} backward.backwardEdges - Edges array with with node objects for Relay.
   * The nodes contain an extra id property for getting merged with the forward edges
   * @returns {Object} backward.backwardParams - The calculated offset/limit params used for the query for
   * the calculation of the pageInfo object
   */
  backwardPaginationEntities({
    type, filter, sortBy, first, after, last, before, total,
  }) {
    const backward = true
    const backwardPagination = this.isBackwardPagination(first, after, last, before)
    if (backwardPagination) {
      const { backward: offset } = this.readCursor(before)
      return this.doFetch({
        filter: parseFilterInput({ ...filter }),
        sortBy: parseSortByInput({ ...sortBy }, true),
        limit: last,
        offset,
        type,
      }).then(res => res.map((node, index) => {
        const { id } = node
        const cursor = this.createCursor({
          total, index, offset, backward,
        })
        return {
          id,
          cursor,
          node,
        }
      }).reverse())
    }
    return []
  }

  /**
   * Does the actual query against baqend
   *
   * @params {Object} query parameters
   * @returns {Array} entities
   */
  doFetch({
    type, filter, sortBy, offset, limit,
  }) {
    return this.db[type].find()
      .where(filter)
      .sort(sortBy)
      .offset(offset)
      .limit(limit)
      .resultList()
      .then(res => res.map(entity => entity.toJSON()))
  }

  /**
   * Queries the number of objects matching a query
   *
   * @params {Object} query parameters
   * @returns {Number} total
   */
  getCount({ type, filter }) {
    const filterObject = parseFilterInput({ ...filter })
    return this.db[type].find()
      .where(filterObject)
      .count()
  }

  /**
   * Creates a PageInfo object according to the Relay spec
   *
   * @params {Array} edges - the merged result of forward and backward pagination results
   * @params {Number} total - total number of results
   * @params first, after, last, before
   *
   * @returns {Array} entities
   */
  getPageInfo(edges, total, first, after, last, before) {
    const forward = this.readCursor(after)
    const backward = this.readCursor(before)
    const forwardPrev = (forward.offset > 0) || false
    const forwardNext = (forward.offset + first < total) || false
    const backwardPrev = (backward.offset + last < total) || false
    const backwardNext = (backward.offset > 0) || false
    return {
      startCursor: (edges && edges.length && edges[0].cursor) || null,
      endCursor: (edges && edges.length && edges[edges.length - 1].cursor) || null,
      hasPreviousPage: backwardPrev || forwardPrev,
      hasNextPage: forwardNext || backwardNext,
    }
  }

  /**
   * Checks wether a forward pagination query should be done
   *
   * @returns {Boolean} entities
   */
  isForwardPagination(first, after, last, before) {
    return ((!!first || !!after) || (!last && !before))
  }

  /**
   * Checks wether a backward pagination query should be done
   *
   * @returns {Boolean} entities
   */
  isBackwardPagination(first, after, last, before) {
    return (!!last || !!before)
  }

  createCursor({
    total, index, offset, backward,
  }) {
    let calculatedIndex
    if (backward) {
      calculatedIndex = total - offset - index
    } else {
      calculatedIndex = 1 + offset + index
    }
    const backwardOffset = ((total > 0 && calculatedIndex > 0) && (total - (calculatedIndex - 1))) || 0
    const forwardOffset = calculatedIndex || 0
    const cursor = `index:${calculatedIndex};total:${total};forward:${forwardOffset};backward:${backwardOffset}`
    return base64(cursor)
    // return cursor
  }

  readCursor(cursor) {
    if (cursor) {
      const string = unbase64(cursor)
      const args = string.split(';').map(arg => arg.split(':'))
      try {
        return {
          [args[0][0]]: parseInt(args[0][1], 10),
          [args[1][0]]: parseInt(args[1][1], 10),
          [args[2][0]]: parseInt(args[2][1], 10),
          [args[3][0]]: parseInt(args[3][1], 10),
        }
      } catch (err) {
        throw new Error('invalid cursor')
      }
    } else {
      return {
        index: 0,
        total: 0,
        forward: 0,
        backward: 0,
      }
    }
  }

  fromGlobalId(id) {
    return {
      type: id.split('/')[2],
      id,
    }
  }
}

export default BaqendResolver
