// import fs from "fs";
// import path from "path";

/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */

// export const typeDefs = fs
//   .readFileSync(
//     process.env.GRAPHQL_SCHEMA || path.join(__dirname, "schema.graphql")
//   )
//   .toString("utf-8");
export const typeDefs = `
type KeyValueContent {
  uuid: ID!
  key: String
  type: String
  value: String
}

type FOG {
  uuid: ID!
  contents: [KeyValueContent] @relation(name: "HAS_CONTENT", direction: "OUT")
  prerequisites: [FOG] @relation(name: "DEPENDS_ON", direction: "OUT")
  postrequisites: [FOG] @relation(name: "DEPENDS_ON", direction: "IN")
  partOfSog: [SOG] @relation(name: "DEPENDS_ON", direction: "IN")
}


type SOG {
  uuid: ID!
  contents: [KeyValueContent] @relation(name: "HAS_CONTENT", direction: "OUT")
  children: [SOG] @relation(name: "DEPENDS_ON", direction: "OUT")
  parents: [SOG] @relation(name: "DEPENDS_ON", direction: "IN")
  fogs: [FOG] @relation(name: "DEPENDS_ON", direction: "OUT")
}


type Query {
  sogsAsCourses: [SOG]
    @cypher(
      statement: "MATCH (s:SOG)-[:HAS_CONTENT]->(kv:KeyValueContent {key: \\"hierarchy\\", value: \\"0\\", type: \\"int\\"}) RETURN s"
    )

  sogChildren(uuid_str: ID!): [SOG]
    @cypher(
        statement: "MATCH (s:SOG {uuid: $uuid_str})-[:DEPENDS_ON]->(children:SOG) RETURN children"
     )

}
`



// // defining value of Any as String for a while
// // union Any = String | Float | Boolean | Int | ID
// export const typeDefs = `
// union Child = Atom | Molecule
//
// type KeyValueContent {
//   key: String
//   value: String
// }
//
// type Atom {
//   title: String
//   description: String!
//   content: [KeyValueContent] @relation(name: "HAS_CONTENT", direction: "OUT")
// }
//
//
// type Molecule {
//   title: String
//   description: String!
//   parent_of: [Child] @relation(name: "HAS_COMPONENT", direction: "OUT")
// }
// `;
//
//
// export const newTypeDefs = `
// type KeyValueContent {
//   key: String
//   value: String
// }
//
//
//
//
// `;
