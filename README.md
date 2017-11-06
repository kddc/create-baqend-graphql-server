<p>
  <img src="https://travis-ci.com/kddc/create-baqend-graphql-server.svg?token=MoPVF1wU6XPzBM7etCnt&branch=master" />
</p>

## Create Baqend GraphQL Server

<p>
  <img src="https://cdn.rawgit.com/kddc/create-baqend-graphql-server/master/logo.png" height="64" width="64"/>
</p>

#### Installation
```
yarn install
```

```
curl -X GET "https://proud-filet-mignon-324.app.baqend.com/v1/code/graphql?query=%7B%20User(id:%20%22/db/User/1382%22)%20%7B%20id%20username%20%7D%20%7D" -H "Content-Type: application/json" -i
```

```
curl -X POST "https://proud-filet-mignon-324.app.baqend.com/v1/code/graphql" -H "fastly-debug: \"1\"" -H "accept: application/json" -H "Content-Type: application/json" -d '{"query": "{ User(id: \"/db/User/1382\") { id username } }"}' -i
```
