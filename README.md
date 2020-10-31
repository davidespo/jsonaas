# JSON as a Service

TODO:

## Data Modeling

```
-> namespace -> document

jaas.doc('david') // uses default collection
jaas.ns('users').doc('david')
```

## Try it out

```shell
docker run -p 3080:3000 davidespo/jsonaas

curl http://localhost:3080/v1/info | jq
curl http://localhost:3080/v1/c/myspace | jq
curl http://localhost:3080/v1/c/myspace/message | jq
curl -XPOST http://localhost:3080/c/ns/myspace -d '{"key":"message","value":"Hello, World!"}' -H "content-type: application/json" | jq
curl http://localhost:3080/v1/c/myspace/message | jq
curl http://localhost:3080/v1/c/myspace | jq
curl http://localhost:3080/v1/c/myspace/__count | jq
```
