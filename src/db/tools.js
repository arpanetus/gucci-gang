import {session as Session} from 'neo4j-driver';
import {Node, User} from './models';
import bcrypt from 'bcrypt';

/**
 * @param {Driver} driver
 * @param {"READ" | "WRITE"} accessMode
 * @return Session
 */
export const createSession = (driver, accessMode = Session.WRITE) => {
  return driver.session({defaultAccessMode: accessMode});
}
/**
 * @param {Driver} driver
 * @param {Session} session
 * @param {"READ" | "WRITE"} accessMode
 * @return Session
 */
export const refreshSessionIfClosedOrOutdated = (driver, session, accessMode = session.WRITE) => {
  return createSession(driver, accessMode)
}
/**
 *
 * @param {Session} session
 * @param {string} query
 * @param {Object} parameters
 * @return {QueryResult}
 */
export const runAndGetResults = async (session, query, parameters) => {
  return session.run(query, parameters);
}

/**
 * @template T
 * @param{Array<Object>} arr
 * @param{T} clazz
 * @param{boolean} isRel
 * @return {Array<T>}
 */
export const arrObjToArrClazz = (arr, clazz, isRel = false) =>
  arr.map((value, index) => {
    const obj = new clazz()
    for (const entry of Object.entries(isRel ? value : value.properties))
      obj[entry[0]] = entry[1]
    return obj
  });


const findUserQuery = (paramsString) => `MATCH (result:User {${paramsString}}) return result`;
const findUserbyUsernameQuery = findUserQuery('username: $username')
const findUserbyUuidQuery = findUserQuery('uuid: $uuid')

/**
 * @param session
 * @return {function(args: {[username]: string, [uuid]: string}): Promise<User|null>}
 */
export const getUserFunc = (session) => async (args) => {
  let records = [];
  if (args.username != undefined) {
    records = await runAndGetResults(
      session,
      findUserbyUsernameQuery,
      {username: args.username}
    );
  } else if (args.uuid != undefined) {
    records = await runAndGetResults(
      session,
      findUserbyUuidQuery,
      {username: args.username}
    );
  }
  if (records != undefined && records.records != undefined && records.records.length !== 0) {
    const {result} = records.records[0].toObject();
    return arrObjToArrClazz([result], User)[0];
  }
  return null;
}

const createUserQuery = (paramsString) => `CREATE (result:User {uuid: apoc.create.uuid()${paramsString}}) return result`

const compileSetParams = (params) => {
  return Object.getOwnPropertyNames(params)
    .map(paramName => `, ${paramName}: $${paramName}`)
    .reduce((t, o) => `${t}${o}`)
}
/**
 * @param session
 * @return {function(args: {
 *    username: string,
 *    [name]:string,
 *    password: string,
 *    [role]:string,
 *    [email]: string
 *    }): Promise<User|null>}
 */
export const createUserFunc = (session) => async (args) => {

  args.password = await bcrypt.hash(args.password, 12)
  const query = createUserQuery(compileSetParams(args));
  const records = await runAndGetResults(session,query,args);
  if (records != undefined && records.records != undefined && records.records.length !== 0) {
    const {result} = records.records[0].toObject();
    return arrObjToArrClazz([result], User)[0];
  }
  return null;
}
