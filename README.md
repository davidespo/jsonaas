# JSON as a Service

TODO:

## Try it out

```shell
docker run -p 3080:3000 davidespo/jsonaas

curl http://localhost:3080/v1/info | jq
curl http://localhost:3080/v1/ns/myspace | jq
curl http://localhost:3080/v1/ns/myspace/message | jq
curl -XPOST http://localhost:3080/v1/ns/myspace -d '{"key":"message","value":"Hello, World!"}' -H "content-type: application/json" | jq
curl http://localhost:3080/v1/ns/myspace/message | jq
curl http://localhost:3080/v1/ns/myspace | jq
curl http://localhost:3080/v1/ns/myspace/__count | jq
```
