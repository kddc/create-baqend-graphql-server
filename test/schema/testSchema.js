const schema = [
  {
    "class": "/db/Post",
    "superClass": "/db/Object",
    "fields": [
      {
        "name": "id",
        "type": "/db/String"
      },
      {
        "name": "title",
        "type": "/db/String"
      },
      {
        "name": "author",
        "type": "/db/User"
      }
    ]
  },
  {
    "class": "/db/User",
    "superClass": "/db/Object",
    "fields": [
      {
        "name": "id",
        "type": "/db/String"
      },
      {
        "name": "username",
        "type": "/db/String"
      },
      {
        "name": "posts",
        "type": "/db/collection.List[/db/Post]"
      }
    ]
  }
]
export default schema
