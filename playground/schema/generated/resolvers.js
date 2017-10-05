import { PubSub, withFilter } from 'graphql-subscriptions';
const pubsub = new PubSub();

// setInterval(() => {
//   console.log('something_changed')
//   pubsub.publish('something_changed', { somethingChanged: { id: "123" }});
// }, 10000);

let resolvers = {
  Post: {
    author: ({ author }, args, { baqendResolver }) => {
      return baqendResolver.resolveReference('User', author, args, {})
    }
  },
  User: {
    posts: ({ posts }, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollection('Post', posts, args, {})
    }
  },
  Query: {
    Post: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('Post', args, {})
    },
    allPosts: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('Post', args, {})
    },
    User: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('User', args, {})
    },
    allUsers: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('User', args, {})
    }
  },
  Subscription: {
    somethingChanged: {
      subscribe: withFilter(() => pubsub.asyncIterator('something_changed'), (payload, variables) => {
        console.log(payload)
        return true
      }),
    },
    somethingChanged2: {
      resolve: ({ somethingChanged }, args, { baqendResolver }, info) => {
        // console.log(args, baqendResolver)
        return somethingChanged;
      },
      subscribe: (payload, variables, { db }, info) => {
        db.Post.find().resultStream().subscribe((items) => {
          pubsub.publish('something_changed', { somethingChanged: items});
        })
        return pubsub.asyncIterator('something_changed')
      }
    }
  }
}
export default resolvers
