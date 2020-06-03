import {KeyValueContent, Node, Rel, RST} from '../db/models';
import {arrObjToArrClazz, createSession, runAndGetResults} from 'db/tools';

const RecursiveSOGResolveQuery =
  `MATCH p = (:SOG {uuid: $uuid})-[d_o:DEPENDS_ON*0..]->(x)-[h_c:HAS_CONTENT*0..]->(c:KeyValueContent)
WITH collect(DISTINCT x) as nodes,
[d_o in collect(distinct last(d_o)) | {from:startNode(d_o).uuid,to:endNode(d_o).uuid}] as nodeRels,
collect(DISTINCT c) as nodeContents,
[h_c in collect(DISTINCT last(h_c)) | {from:startNode(h_c).uuid, to:endNode(h_c).uuid}] as nodeContentRels
FOREACH (node in nodes | set node.type = apoc.coll.randomItem((labels(node))))
RETURN  nodes, nodeRels, nodeContents, nodeContentRels;`

/**
 *
 * @param {Session} session
 * @param {string} uuid
 * @return {Promise<RST>}
 */
const runQuery = async (session, uuid) => {
  const {records} = await runAndGetResults(session, RecursiveSOGResolveQuery)
  // const {records} = await session.run(RecursiveSOGResolveQuery, {uuid});
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
 * @return RST
 * @param parent
 * @param context
 * @param info
 */
export default async (
  parent, {uuid}, context, info
) => {
  const session = createSession(context.driver)
  return await runQuery(session, uuid)
}
