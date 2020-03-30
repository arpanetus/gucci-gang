'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {makeAugmentedSchema} = require("neo4j-graphql-js");
const neo4j = require("neo4j-driver");
const apolloServer = require('apollo-server');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const typeDefs = require('./constants').typeDefs;
const ENV = require('./constants').ENV;

const schema = makeAugmentedSchema({typeDefs});

const app = express();


const driver = neo4j.driver(
    ENV.NEO4J_URI,
    neo4j.auth.basic(ENV.NEO4J_USER, ENV.NEO4J_PASSWORD)
);



const server = new apolloServer.ApolloServer({ schema, context: { driver } });

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


module.exports = app;
