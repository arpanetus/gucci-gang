'use strict';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { makeAugmentedSchema } from "neo4j-graphql-js";
import neo4j from "neo4j-driver";
import { ApolloServer } from 'apollo-server';


import indexRouter from 'routes/index';
import usersRouter from 'routes/users';
import { typeDefs } from 'apollo/typedefs';
import { ENV } from './constants';

const schema = makeAugmentedSchema({typeDefs});

const app = express();


const driver = neo4j.driver(
  ENV.NEO4J_URI,
  neo4j.auth.basic(ENV.NEO4J_USER, ENV.NEO4J_PASSWORD)
);

const server = new ApolloServer({ schema, context: { driver } });

server.listen(3003, '0.0.0.0').then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


export default app;
