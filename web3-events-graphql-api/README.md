# Web3 Events GraphQL API

###### For get all events
```graphql
query {
  findEvents(contractAddress: "", eventName: "") {
    id,
    name
  }
}
```
