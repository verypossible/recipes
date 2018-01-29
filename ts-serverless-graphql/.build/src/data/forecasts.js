"use strict";
// import * as uuid from 'uuid/v1'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TableName = 'forecasts';
exports.getForecasts = db => () => __awaiter(this, void 0, void 0, function* () {
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
    };
    // Load Data
    const data = yield db.scan(params);
    // Connection Response Type
    return data;
});
exports.queryForecasts = db => ({ projectId }) => __awaiter(this, void 0, void 0, function* () {
    // Set Loading params
    const params = {
        TableName,
        KeyConditionExpression: 'projectId = :project',
        ExpressionAttributeValues: {
            ':project': projectId
        }
    };
    // Load Data
    const data = yield db.query(params);
    // Construct edges
    const edges = data.Items.map(edge => ({
        cursor: edge.id,
        node: edge
    }));
    // Paginated connection response type
    return {
        edges
    };
});
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
//# sourceMappingURL=forecasts.js.map