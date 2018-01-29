import * as moment from 'moment'
import * as uuid from 'uuid/v1'

const TableName = 'projects'

export const getProjects = db => async id => {
  const params = {
    TableName,
    AttributesToGet: ['id', 'name', 'havestId', 'createdAt', 'updatedAt']
  }

  // Load Data
  const data = await db.scan(params)

  // Build Edges
  const edges = data.map(edge => ({ cursor: edge.id, node: edge }))

  // Connection Response Type
  return {
    edges
  }
}

export const getProject = db => async id => {
  const params = {
    TableName,
    Key: {
      id
    }
  }

  // Load Data
  const data = await db.get(params)

  // Node Response Type
  return data
}

export const createProject = db => async ({ name, harvestId }) => {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      name: name,
      harvestId,
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString()
    }
  }

  // Create result
  const data = await db.create(params)

  return data
}

export const updateProject = db => async ({ id, harvestId, name }) => {
  const updatedAt = moment().toISOString()
  const params = {
    TableName,
    Key: {
      id
    },
    ExpressionAttributeValues: {
      ':harvest_id:': harvestId,
      ':updated_at:': updatedAt
    },
    UpdateExpression: 'SET harvestId = :harvest_id, updatedAt = :updated_at',
    ReturnValues: 'ALL_NEW'
  }

  return await db.update(params, { id, harvestId, name })
}

export const deleteProject = db => ({ id }) => {
  const params = {
    TableName,
    Key: {
      id
    }
  }

  return db.del(params, { id })
}
