// defining value of Any as String for a while
// union Any = String | Float | Boolean | Int | ID
export const typeDefs = `
union Child = Atom | Molecule

type KeyValueContent {
  key: String
  value: String
}

type Atom {
  title: String
  description: String!
  content: [KeyValueContent] @relation(name: "HAS_CONTENT", direction: "OUT")
}


type Molecule {
  title: String
  description: String!
  parent_of: [Child] @relation(name: "HAS_COMPONENT", direction: "OUT")
}
`;
