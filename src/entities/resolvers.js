import { neo4jgraphql } from "neo4j-graphql-js";

export const resolvers = {
  Query: {
    SOG(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
};
