import { ApolloServer, gql } from "apollo-server"; // const { ApolloServer, gql } = require("apollo-server") 와 같음

const server = new ApolloServer({})

server.listen().then(({url}) => {
    console.log(`Running on ${url}`)
})