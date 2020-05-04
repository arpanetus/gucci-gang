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

const keys = {
    inheritance_desc: uuid4(),
    inheritance_title: uuid4(),
    inheritance_fog: uuid4(),

    polymorphism_desc: uuid4(),
    polymorphism_title: uuid4(),
    polymorphism_fog: uuid4(),

    encapsulation_desc: uuid4(),
    encapsulation_title: uuid4(),
    encapsulation_fog: uuid4(),

    oop_title: uuid4(),
    oop_desc: uuid4(),
    oop_sog: uuid4(),

    integer_desc: uuid4(),
    integer_title: uuid4(),
    integer_fog: uuid4(),

    float_desc: uuid4(),
    float_title: uuid4(),
    float_fog: uuid4(),

    string_desc: uuid4(),
    string_title: uuid4(),
    string_fog: uuid4(),

    object_desc: uuid4(),
    object_title: uuid4(),
    object_fog: uuid4(),

    datatypes_title: uuid4(),
    datatypes_desc: uuid4(),
    datatypes_sog: uuid4(),

    java_programming_hier: uuid4(),
    java_programming_title: uuid4(),
    java_programming_desc: uuid4(),
    java_programming_sog: uuid4(),

    discrete_math_hier: uuid4(),
    discrete_math_title: uuid4(),
    discrete_math_desc: uuid4(),
    discrete_math_sog: uuid4(),

}

const iterator = namegen()

const createKV = (X, type, hierval=0) => ((ktv) =>
    `${iterator.next().value}: CreateKeyValueContent(
    uuid: "${keys[`${X}_${type}`]}",
    ${ktv}
  ) {
    uuid
  }` )(type === "desc"
    ?
    `key: "description"
    type: "markdown"
    value: "# ${X}"`
    : type === "title"
        ?
        `key: "title"
    type: "string"
    value: "${X}"`
        :
        `key: "hierarchy"
    type: "int"
    value: "${hierval}"`)

const createXY = (X, Y) =>
    `${iterator.next().value}: Create${Y}(
    uuid: "${keys[`${X}_${Y.toLowerCase()}`]}",
  ) {
    uuid
  }`

const addYContents = (X, Y, type) =>
    `${iterator.next().value}: Add${Y}Contents(
    from: {uuid: "${keys[`${X}_${Y.toLowerCase()}`]}"}
    to: {uuid: "${keys[`${X}_${type}`]}"}
  ) {
    from {
      uuid
    }
  }`

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

const addFogContents = (X, type) => addYContents(X, "FOG", type)
const addSogContents = (X, type) => addYContents(X, "SOG", type)

const createDesc = (X) => createKV(X, "desc")
const createTitle = (X) => createKV(X, "title")
const createHier = (X) => createKV(X, "hier", 0)
const addFogDesc = (X) => addFogContents(X, "desc")
const addFogTitle = (X) => addFogContents(X, "title")
const addSogDesc = (X) => addSogContents(X, "desc")
const addSogTitle = (X) => addSogContents(X, "title")
const addSogHier = (X) => addSogContents(X, "hier")
const createXFogAndAddItsContents = (X) => `
  ${createDesc(X)}
  ${createTitle(X)}
  ${createXFog(X)}
  ${addFogDesc(X)}
  ${addFogTitle(X)}
`
const createXSogAndAddItsContents = (X) => `
  ${createDesc(X)}
  ${createTitle(X)}
  ${createXSog(X)}
  ${addSogDesc(X)}
  ${addSogTitle(X)}
`
const createMFogsAndItsContents = (M) =>
    M.map(createXFogAndAddItsContents).reduce((f,s) => `${f}\n${s}`)

const createMSogsAndItsContents = (M) =>
    M.map(createXSogAndAddItsContents).reduce((f,s) => `${f}\n${s}`)

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
    ["oop", "datatypes", "java_programming", "discrete_math"])

const createdJavaHier = createHier("java_programming")
const createdDiscHier = createHier("discrete_math")

const addedJavaHier = addSogHier("java_programming")
const addedDiscHier = addSogHier("discrete_math")

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
  ${createdDiscHier}
  ${createdJavaHier}
  ${addedDiscHier}
  ${addedJavaHier}
  ${addedOopFogs}
  ${addedDatatypesFogs}
  ${addedJavaChildren}
  ${addedOopChildrenPrerequisite}
}
`;
