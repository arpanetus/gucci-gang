import {session} from 'neo4j-driver';
import {KeyValueContent, Node, Rel, RST} from './models';

const RecursiveSOGResolveQuery =
  `MATCH p = (:SOG {uuid: $uuid})-[d_o:DEPENDS_ON*0..]->(x)-[h_c:HAS_CONTENT*0..]->(c:KeyValueContent)
WITH collect(DISTINCT x) as nodes,
[d_o in collect(distinct last(d_o)) | {from:startNode(d_o).uuid,to:endNode(d_o).uuid}] as nodeRels,
collect(DISTINCT c) as nodeContents,
[h_c in collect(DISTINCT last(h_c)) | {from:startNode(h_c).uuid, to:endNode(h_c).uuid}] as nodeContentRels
FOREACH (node in nodes | set node.type = apoc.coll.randomItem((labels(node))))
RETURN  nodes, nodeRels, nodeContents, nodeContentRels;`
/**
 * @param {Driver} driver
 * @return function
 */
const createSession = (driver) => {
  return driver.session({defaultAccessMode: session.READ});
}
/**
 * @template T
 * @param{Array<Object>} arr
 * @param{T} clazz
 * @param{boolean} isRel
 * @return {Array<T>}
 */
const arrObjToArrClazz = (arr, clazz, isRel = false) =>
  arr.map((value, index) => {
    const obj = new clazz()
    for (const entry of Object.entries(isRel ? value : value.properties))
      obj[entry[0]] = entry[1]
    return obj
  })
/**
 *
 * @param {Session} session
 * @param {string} uuid
 * @return {Promise<RST>}
 */
const runQuery = async (session, uuid) => {
  const {records} = await session.run(RecursiveSOGResolveQuery, {uuid});
  const {nodes, nodeRels, nodeContents, nodeContentRels} = records[0].toObject();
  return new RST(
    arrObjToArrClazz(nodes, Node),
    arrObjToArrClazz(nodeRels, Rel, true),
    arrObjToArrClazz(nodeContents, KeyValueContent),
    arrObjToArrClazz(nodeContentRels, Rel, true)
  );
}
/**
 * @param {Driver} driver
 * @return function
 */
export default (driver) => async (
  parent, {uuid}
) => {
  const session = createSession(driver)
  return await runQuery(session, uuid)
}
