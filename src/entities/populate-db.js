import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mutations from "entities/mutations";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


dotenv.config();

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URI, fetch }),
  cache: new InMemoryCache()
});

client
  .mutate({
    mutation: gql(mutations)
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
