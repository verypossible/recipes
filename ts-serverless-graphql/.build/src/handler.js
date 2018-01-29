"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const graphql_playground_middleware_lambda_1 = require("graphql-playground-middleware-lambda");
const data_1 = require("./data");
const db = require("./db");
const schema_1 = require("./schema");
function graphql(event, context, callback) {
    const callbackFilter = (error, output) => {
        const outputWithHeader = Object.assign({}, output, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        callback(error, outputWithHeader);
    };
    const mergeContext = Object.assign({ resolve: data_1.resolve(db), db,
        event, mutate: data_1.mutate(db) }, context);
    apollo_server_lambda_1.graphqlLambda({ schema: schema_1.default, context: mergeContext, tracing: true })(event, context, callbackFilter);
}
exports.graphql = graphql;
// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playground = graphql_playground_middleware_lambda_1.default({
    endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql'
});
exports.graphiql = apollo_server_lambda_1.graphiqlLambda({
    endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql'
});
//# sourceMappingURL=handler.js.map