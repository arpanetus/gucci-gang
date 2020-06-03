import ApolloClient from 'apollo-client';
import jwt from 'jsonwebtoken';

const getUserFromToken = token => {
  try {
    if (token) {
      return jwt.verify(token, 'my-secret-from-env-file-in-prod')
    }
    return null
  } catch (err) {
    return null
  }
}

/**
 *
 * @param {Driver} driver
 * @param {ApolloClient} client
 * @param {Session} session
 * @return {function({req: IncomingMessage}): {user: *}}
 */
export default (client, driver, session) => ({ req }) => {
  const tokenWithBearer = req.headers.authorization || ''
  const token = tokenWithBearer.split(' ')[1]
  req.user = getUserFromToken(token);
  return { client, driver, session, req };
}
