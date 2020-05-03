import ApolloClient from "apollo-client"
import gql from "graphql-tag"
import dotenv from "dotenv"
import fetch from "node-fetch"
import mutations from "entities/mutations"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import yargs from 'yargs'
import fs from 'fs'

dotenv.config()

const argv = yargs
  .alias('r', 'run')
  .alias('l', 'log')
  .argv

console.log()

if(argv._[0]==='log') {
  fs.writeFile('public/helloworld.graphql', mutations, function (err) {
    if (err) return console.log(err)
  })
}

if(argv._[0]==='run') {
  const client = new ApolloClient({
    link: new HttpLink({uri: process.env.GRAPHQL_URI, fetch}),
    cache: new InMemoryCache()
  })

  client
    .mutate({
      mutation: gql(mutations)
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
}
