"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const types_1 = require("./types");
const resolvers_1 = require("./resolvers");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: types_1.default,
    resolvers: resolvers_1.default
});
console.log(exports.schema, 'SCHEMA');
exports.default = exports.schema;
//# sourceMappingURL=index.js.map