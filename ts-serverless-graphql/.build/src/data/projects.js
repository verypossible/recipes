"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const uuid = require("uuid/v1");
const TableName = 'projects';
exports.getProjects = db => (id) => __awaiter(this, void 0, void 0, function* () {
    const params = {
        TableName,
        AttributesToGet: ['id', 'name', 'havestId', 'createdAt', 'updatedAt']
    };
    // Load Data
    const data = yield db.scan(params);
    // Build Edges
    const edges = data.map(edge => ({ cursor: edge.id, node: edge }));
    // Connection Response Type
    return {
        edges
    };
});
exports.getProject = db => (id) => __awaiter(this, void 0, void 0, function* () {
    const params = {
        TableName,
        Key: {
            id
        }
    };
    // Load Data
    const data = yield db.get(params);
    // Node Response Type
    return data;
});
exports.createProject = db => ({ name, harvestId }) => __awaiter(this, void 0, void 0, function* () {
    const params = {
        TableName,
        Item: {
            id: uuid(),
            name: name,
            harvestId,
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString()
        }
    };
    // Create result
    const data = yield db.create(params);
    return data;
});
exports.updateProject = db => ({ id, harvestId, name }) => __awaiter(this, void 0, void 0, function* () {
    const updatedAt = moment().toISOString();
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
    };
    return yield db.update(params, { id, harvestId, name });
});
exports.deleteProject = db => ({ id }) => {
    const params = {
        TableName,
        Key: {
            id
        }
    };
    return db.del(params, { id });
};
//# sourceMappingURL=projects.js.map