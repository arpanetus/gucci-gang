'use strict';
import { typeDefs } from "entities/typedefs";
import { resolvers } from 'entities/resolvers';
import { ApolloServer } from "apollo-server-express";
import { driver } from 'driver'
import express from "express";
import { makeAugmentedSchema } from "neo4j-graphql-js";
import dotenv from "dotenv";

// set environment variables from ../.env
dotenv.config();

const index = express();
index.use('/static', express.static('public'))

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  context: { driver },
  schema: schema,
  introspection: true,
  playground: true
});

const port = process.env.GRAPHQL_LISTEN_PORT || 4001;
const path = "/graphql";

server.applyMiddleware({app: index, path});

index.listen({port, path}, () => {
  console.log(`GraphQL server ready at http://localhost:${port}${path}`);
});


// 
