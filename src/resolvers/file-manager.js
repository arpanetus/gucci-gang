import {v4 as uuid4} from 'uuid';
import mime from 'mime-types';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';

export const genFileName = mimetype => `${uuid4()}.${mime.extension(mimetype)}`;

export class FileManager {
  _createString(filename, mimetype, encoding) {
    return `mutation {
    CreateFile(filename: "${filename}", mimetype: "${mimetype}", encoding: "${encoding}") {
      filename,
      mimetype,
      encoding
    }
  }`
  }

  _deleteString(filename) {
    return `mutation {
    DeleteFile(filename: "${filename}") {
      filename,
      mimetype,
      encoding
    }
  }`
  }

  _getString(filename) {
    return `query {
     File(filename: "${filename}") {
       filename,
       mimetype,
       encoding
      }
    }`
  }

  /**
   * @param {object} fileOptions
   * @param {ApolloClient}  client
   */
  constructor(fileOptions = {filename: null, mimetype: null, encoding: null}, client) {
    this.filename = fileOptions.filename
    this.mimetype = fileOptions.mimetype
    this.encoding = fileOptions.encoding
    this.client = client
  }

  async getFile() {
    let fileData = null;
    await this.client.query({
      query: gql(this._getString(this.filename))
    })
      .then(data => fileData = data)
      .catch(error => console.error(error))
    return fileData
  }

  createFile() {
    return this.client.mutate({
      mutation: gql(this._createString(this.filename, this.mimetype, this.encoding))
    })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }


  async deleteFile() {
    let fileData = null;
    await this.client.mutate({
      mutation: gql(this._deleteString(this.filename))
    })
      .then(data => fileData = data)
      .catch(error => console.error(error));
    return fileData
  }
}
