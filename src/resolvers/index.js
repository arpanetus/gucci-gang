import {neo4jgraphql} from 'neo4j-graphql-js'
import RecursiveSOGTree from './rst';
import {DeleteFileAndRemoveFromDb, UploadFile} from './file-manager';
import {getCurrentUser, login, register} from './auth';

export default {
  Query: {
    RecursiveSOGTree: RecursiveSOGTree,
    _RecSOGTree(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    currentUser: getCurrentUser,
    login: login
  },

  Mutation: {
    DeleteFileAndRemoveFromDb: DeleteFileAndRemoveFromDb,
    UploadFile: UploadFile,
    register: register,
    CreateTag: async (object, params, ctx, resolveInfo) => {
      return await neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
  }
}
