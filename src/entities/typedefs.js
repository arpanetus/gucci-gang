export const typeDefs = /* GraphQL */ `
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


#type Query {
  # SOG(filter: [_KeyValueContentFilter]): [SOG]

  # sogsAsCourses: [SOG]
  #   @cypher(
  #     statement: "match (s:SOG)-[:HAS_CONTENT]->(:KeyValueContent {key:'hierarchy', value:'0'}) match (s:SOG)-[:HAS_CONTENT]->(kv) WITH {uuid: s.uuid, contents: collect(kv)} AS sog RETURN sog"
  #   )
  #
  # sogChildren(uuid_str: ID!): [SOG]
  #   @cypher(
  #       statement: "MATCH (s:SOG {uuid: $uuid_str})-[:DEPENDS_ON]->(children:SOG) RETURN children"
  #    )
#}
`
