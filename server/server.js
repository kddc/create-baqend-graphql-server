var { graphql } = require('graphql');
var { schema } = require('./schema');
var { db } = require('baqend')
var util = require('util')

db.connect('proud-filet-mignon-324').then((db) => {
  db.User.login('admin', 'temogu45').then((user) => {
    console.log("successfully connected to proud-filet-mignon-324 as " + db.User.me.username)
    graphql(schema, '{ allPosts { title author { username }}}', null, { db }).then((response) => {
      console.log(util.inspect(response, false, null))
    });
  })
})
