// import * as uuid from 'uuid/v1'

const TableName = 'forecasts'

export const getForecasts = db => async () => {
  // Set Loading params
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'date',
      'hours',
      'projectId',
      'updatedAt',
      'createdAt'
    ]
  }

  // Load Data
  const data = await db.scan(params)

  // Connection Response Type
  return data
}

export const queryForecasts = db => async ({ projectId }) => {
  // Set Loading params
  const params = {
    TableName,
    KeyConditionExpression: 'projectId = :project',
    ExpressionAttributeValues: {
      ':project': projectId
    }
  }

  // Load Data
  const data = await db.query(params)

  // Construct edges
  const edges = data.Items.map(edge => ({
    cursor: edge.id,
    node: edge
  }))

  // Paginated connection response type
  return {
    edges
  }
}
//
// export const getForecastById = id => {
//   const params = {
//     TableName,
//     Key: {
//       id
//     }
//   }
//
//   return db('get', params)
// }

// export function createForecast(args) {
//   const params = {
//     TableName,
//     Item: {
//       id: uuid(),
//       harvestId: args.harvestId,
//       createdAt: args.createdAt,
//       updatedAt: args.updatedAt
//     }
//   }
//
//   return db.createItem(params)
// }
//
// export function updateForecast(args) {
//   const params = {
//     TableName,
//     Key: {
//       id: args.id
//     },
//     ExpressionAttributeValues: {
//       ':harvest_id': args.harvestId,
//       ':updated_at:': args.updatedAt
//     },
//     UpdateExpression: 'SET harvestId = :harvest_id, updatedAt = :updated_at',
//     ReturnValues: 'ALL_NEW'
//   }
//
//   return db.updateItem(params, args)
// }
//
// export function deleteForecast(args) {
//   const params = {
//     TableName,
//     Key: {
//       id: args.id
//     }
//   }
//
//   return db.deleteItem(params, args)
// }
