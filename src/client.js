import dotenv from 'dotenv';
import ApolloClient from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import fetch from 'node-fetch';
import {InMemoryCache} from 'apollo-cache-inmemory';

dotenv.config();

export default new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URI, fetch }),
  cache: new InMemoryCache()
});
