import bcrypt from 'bcrypt'
import ApolloClient from 'apollo-client';
import {
  doesUsernameAlreadyExist,
  isPasswordEmpty,
  isUsernameEmpty,
  isUserNullOrDoesntExist
} from './validators';
import {session as Session} from 'neo4j-driver';
import {createUserFunc, getUserFunc, refreshSessionIfClosedOrOutdated} from '../db/tools';
import {AuthenticationError} from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

/**
 *
 * @param parent
 * @param {{
 *    username: string,
 *    [name]:string,
 *    password: string,
 *    [role]:string,
 *    [email]: string
 *    }} args
 * @param {{driver:Driver, client: ApolloClient, session: Session, req: express.Request}} context
 * @param info
 * @return {Promise<User>}
 */
export const register = async (parent, args, context, info) => {
  isUsernameEmpty(args);
  let {session, driver} = context;
  await doesUsernameAlreadyExist(args, session);
  session = refreshSessionIfClosedOrOutdated(driver, session);
  isPasswordEmpty(args);
  const user = await (createUserFunc(session))(args);
  await isUserNullOrDoesntExist(user, session);
  return user;
}

/**
 *
 * @param parent
 * @param {{
 *    username: string,
 *    password: string,
 *    [role]:string,
 *    }} args
 * @param {{driver:Driver, client: ApolloClient, session: Session, req: express.Request}} context
 * @param info
 * @return {Promise<User>}
 */
export const login = async (parent, {username, password}, context, info) => {
  isUsernameEmpty({username})
  let {session, driver} = context
  const user = await getUserFunc(session)({username})
  if (!user) throw new AuthenticationError('Invalid Login');

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) throw new AuthenticationError('Invalid Login');


  const token = jwt.sign(
    {
      uuid: user.uuid,
      username: user.username,
      role: user.role
    },
    'my-secret-from-env-file-in-prod',
    {
      expiresIn: '30d', // token will expire in 30days
    },
  )
  return {
    token,
    user,
  }

}

/**
 *
 * @param parent
 * @param {null} [args]
 * @param {{driver:Driver, client: ApolloClient, session: Session, req: express.Request}} context
 * @param info
 * @return {Promise<User>}
 */
export const getCurrentUser = async (parent, args, context, info) => {
  return await getUserFunc(context.session)(context.req.user.username)
}
