import {v4 as uuid4 } from 'uuid';

const strFromIdx = (idx) => {
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const str_length = 26
    let str_concat = ''
    if(idx===0)
        return 'A'
    while (idx>0) {
        str_concat = str[idx%str_length]+str_concat
        idx = idx/str_length >> 0
    }
    return str_concat
}

const namegen = function*() {
    let innerCounter = 0
    while (true){
        yield strFromIdx(innerCounter)
        innerCounter++;
    }
}

const kvcKeyToType = {
  description: 'string',
  title: 'string',
  content: 'markdown',
  hierarchy: 'int'
}

const keys = {
    inheritance_content_2: uuid4(),
    inheritance_content_1: uuid4(),
    inheritance_description: uuid4(),
    inheritance_title: uuid4(),
    inheritance_fog: uuid4(),

    polymorphism_content_2: uuid4(),
    polymorphism_content_1: uuid4(),
    polymorphism_description: uuid4(),
    polymorphism_title: uuid4(),
    polymorphism_fog: uuid4(),

    encapsulation_content_2: uuid4(),
    encapsulation_content_1: uuid4(),
    encapsulation_description: uuid4(),
    encapsulation_title: uuid4(),
    encapsulation_fog: uuid4(),

    oop_content_2: uuid4(),
    oop_content_1: uuid4(),
    oop_description: uuid4(),
    oop_title: uuid4(),
    oop_sog: uuid4(),

    integer_content_2: uuid4(),
    integer_content_1: uuid4(),
    integer_description: uuid4(),
    integer_title: uuid4(),
    integer_fog: uuid4(),

    float_content_2: uuid4(),
    float_content_1: uuid4(),
    float_description: uuid4(),
    float_title: uuid4(),
    float_fog: uuid4(),

    string_content_2: uuid4(),
    string_content_1: uuid4(),
    string_description: uuid4(),
    string_title: uuid4(),
    string_fog: uuid4(),

    object_content_2: uuid4(),
    object_content_1: uuid4(),
    object_description: uuid4(),
    object_title: uuid4(),
    object_fog: uuid4(),

    datatypes_content_2: uuid4(),
    datatypes_content_1: uuid4(),
    datatypes_description: uuid4(),
    datatypes_title: uuid4(),
    datatypes_sog: uuid4(),

    java_programming_content_2: uuid4(),
    java_programming_content_1: uuid4(),
    java_programming_description: uuid4(),
    java_programming_hierarchy: uuid4(),
    java_programming_title: uuid4(),
    java_programming_sog: uuid4(),

    discrete_math_content_2: uuid4(),
    discrete_math_content_1: uuid4(),
    discrete_math_description: uuid4(),
    discrete_math_hierarchy: uuid4(),
    discrete_math_title: uuid4(),
    discrete_math_sog: uuid4(),

}

const iterator = namegen()

const createKV = (X, key, val, type, orderForField=null, order=null) =>
  (orderValStuff => `${iterator.next().value}: CreateKeyValueContent(
    key: "${key}"
    type: "${type}"
    ${orderValStuff}
  ) {
    uuid
  }`)(order!==null&&orderForField!==null
    ?
      `uuid: "${keys[`${X}_${key}_${order}`]}"
    value: "${val}_${order}"
    order: ${order}
    orderForField: "${orderForField}"
    `:`uuid: "${keys[`${X}_${key}`]}"
    value: "${val}"
    order: null
    orderForField: null`)


const createXY = (X, Y) =>
    `${iterator.next().value}: Create${Y}(
    uuid: "${keys[`${X}_${Y.toLowerCase()}`]}",
  ) {
    uuid
  }`

const addYContents = (X, Y, key, order=null) =>
  (to=>`${iterator.next().value}: Add${Y}Contents(
    from: {uuid: "${keys[`${X}_${Y.toLowerCase()}`]}"}
    to: {uuid: "${to}"}
  ) {
    from {
      uuid
    }
  }`)(order !== null
    ?`${keys[`${X}_${key}_${order}`]}`
    :`${keys[`${X}_${key}`]}`)

const addXFogYPrerequisite = (X, Y) =>
    `${iterator.next().value}: AddFOGPrerequisites(
    from: {uuid: "${keys[`${X}_fog`]}"}
    to: {uuid: "${keys[`${Y}_fog`]}"}
  ) {
    from {
      uuid
    }
  }`

const addSogFogs = (sog, fog) =>
    `${iterator.next().value}: AddSOGFogs(
    from: {uuid: "${keys[`${sog}_sog`]}"}
    to: {uuid: "${keys[`${fog}_fog`]}"}
  ) {
    from {
      uuid
    }
  }`

const addSogChild = (sog, childSog) =>
    `${iterator.next().value}: AddSOGChildren(
    from: {uuid: "${keys[`${sog}_sog`]}"}
    to: {uuid: "${keys[`${childSog}_sog`]}"}
  ) {
    from {
      uuid
    }
  }`


const createXFog = (X) => createXY(X, "FOG")
const createXSog = (X) => createXY(X, "SOG")

const addFogContents = (X, key, order) => addYContents(X, "FOG", key, order)
const addSogContents = (X, key, order) => addYContents(X, "SOG", key, order)

const createDescription = (X, val) => createKV(
  X, "description", val, kvcKeyToType["description"])

const createTitle = (X, val) => createKV(
  X, "title", val, kvcKeyToType["title"])

const createMarkdown = (X, val, order) => createKV(
  X, "content", val, kvcKeyToType["content"], "content", order)

const createHierarchy = (X, val) => createKV(
  X, "hierarchy", val, kvcKeyToType["hierarchy"])


const addFogDescription = (X) => addFogContents(X, "description")
const addFogTitle = (X) => addFogContents(X, "title")
const addFogMarkdown = (X, order) => addFogContents(X, "content", order)
const addSogDescription = (X) => addSogContents(X, "description")
const addSogTitle = (X) => addSogContents(X, "title")
const addSogMarkdown = (X, order) => addSogContents(X, "content", order)
const addSogHierarchy = (X) => addSogContents(X, "hierarchy")
const createXFogAndAddItsContents = (X) => `
  ${createDescription(X, `Some description of ${X}`)}
  ${createTitle(X, X.toUpperCase())}
  ${createMarkdown(X, `# ${X}`, 1)}
  ${createMarkdown(X, `# ${X}`, 2)}
  ${createXFog(X)}
  ${addFogDescription(X)}
  ${addFogTitle(X)}
  ${addFogMarkdown(X, 1)}
  ${addFogMarkdown(X, 2)}
`
const createXSogAndAddItsContents = (X, hierarchy=null) =>
  ((hierarchyString)=>`${createDescription(X, `Some description of ${X}`)}
  ${createTitle(X, X.toUpperCase())}
  ${createMarkdown(X, `# ${X}`, 1)}
  ${createMarkdown(X, `# ${X}`, 2)}
  ${hierarchyString}
  ${addSogDescription(X)}
  ${addSogTitle(X)}
  ${addSogMarkdown(X, 1)}
  ${addSogMarkdown(X, 2)}
`)(hierarchy !== null ?
    `${createHierarchy(X, hierarchy)}
  ${createXSog(X)}
  ${addSogHierarchy(X)}
  ` : `${createXSog(X)}`)

const createMFogsAndItsContents = (M) =>
    M.map(createXFogAndAddItsContents).reduce((f,s) => `${f}\n${s}`)

const createMSogsAndItsContents = (MwithoutHierarchy, MwithHierarchy) =>
  `${MwithoutHierarchy.map((X)=>createXSogAndAddItsContents(X)).reduce((f,s) => `${f}\n${s}`)}
   ${MwithHierarchy.map(({X, hierarchy})=>createXSogAndAddItsContents(X, hierarchy))
      .reduce((f,s) => `${f}\n${s}`)}`


const addXSogMFogs = (X, M) =>
    M.map((fog)=>addSogFogs(X, fog)).reduce((f,s) => `${f}\n${s}`)

const addXSogMChildren = (X, M) =>
    M.map((fog)=>addSogChild(X, fog)).reduce((f,s) => `${f}\n${s}`)

const addXFogMPrerequisites = (X, M) =>
    M.map((fog)=>addXFogYPrerequisite(X, fog)).reduce((f,s) => `${f}\n${s}`)

const addNFogsMPrerequisites = (N, M) =>
    N.map((fog)=>addXFogMPrerequisites(fog, M)).reduce((f,s) => `${f}\n${s}`)


const oopChildren = ["inheritance", "polymorphism", "encapsulation"]
const datatypesChildren = ["integer", "float", "string", "object"]

const createdOopChildren = createMFogsAndItsContents(oopChildren)
const createdDatatypesChildren = createMFogsAndItsContents(datatypesChildren)

const addedOopFogs = addXSogMFogs("oop", oopChildren)
const addedDatatypesFogs = addXSogMFogs("datatypes", datatypesChildren)

const createdJavaDiscAndJavaChildren = createMSogsAndItsContents(
    ["oop", "datatypes"], [
      {X:"java_programming", hierarchy:'0'}, {X:"discrete_math", hierarchy:'0'}])

const addedJavaChildren = addXSogMChildren(
    "java_programming",
    ["oop", "datatypes"]
)

const addedOopChildrenPrerequisite = addNFogsMPrerequisites(
    oopChildren,
    datatypesChildren
)

export default /* GraphQL */ `
mutation {
  ${createdOopChildren}
  ${createdDatatypesChildren}
  ${createdJavaDiscAndJavaChildren}
  ${addedOopFogs}
  ${addedDatatypesFogs}
  ${addedJavaChildren}
  ${addedOopChildrenPrerequisite}
}
`;
