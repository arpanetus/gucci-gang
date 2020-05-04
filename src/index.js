import { typeDefs } from "./graphql-schema";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import driver from 'driver';
import { makeAugmentedSchema } from "neo4j-graphql-js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const schema = makeAugmentedSchema({
  typeDefs
});


const server = new ApolloServer({
  context: { driver },
  schema: schema,
  introspection: true,
  playground: true
});

const port = process.env.GRAPHQL_LISTEN_PORT || 4001;
const path = "/graphql";

server.applyMiddleware({app, path});

app.listen({port, path}, () => {
  console.log(`GraphQL server ready at http://localhost:${port}${path}`);
});
