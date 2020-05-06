import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import dotenv from "dotenv";
import seedmutations from "scripts/seed/seed-mutations";
import fetch from "node-fetch";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import client from "client";

dotenv.config();

client
  .mutate({
    mutation: gql(seedmutations)
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
