import * as AWS from 'aws-sdk'

const config = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

function makeClient(opts?: { region: string; endpoint: string }) {
  return new AWS.DynamoDB.DocumentClient(opts)
}

const dynamoDb = process.env.IS_OFFLINE ? makeClient(config) : makeClient()

/**
  Methods:
    - scan, get, put, update, delete
    - Visit localhost:8000 for interactive DynmoDB templates

 */

export function scan(params) {
  return dynamoDb
    .scan(params)
    .promise()
    .then(
      function(data) {
        return data.Items
      },
      function(err) {
        return err
      }
    )
}

export function query(params) {
  return dynamoDb
    .query(params)
    .promise()
    .then(
      function(data) {
        return data
      },
      function(err) {
        return err
      }
    )
}

export function get(params) {
  return dynamoDb
    .get(params)
    .promise()
    .then(
      function(data) {
        return data.Item
      },
      function(err) {
        return err
      }
    )
}

export function create(params) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .put(params)
      .promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err))
  )
}

export function update(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .update(params)
      .promise()
      .then(() => resolve(args))
      .catch(err => reject(err))
  )
}

export function del(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .delete(params)
      .promise()
      .then(() => resolve(args))
      .catch(err => reject(err))
  )
}
