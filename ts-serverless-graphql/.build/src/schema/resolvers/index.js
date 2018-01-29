"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forecast_1 = require("./forecast");
const project_1 = require("./project");
exports.default = {
    Query: Object.assign({}, forecast_1.default.RootQuery, project_1.default.RootQuery),
    Mutation: Object.assign({}, project_1.default.RootMutation),
    Project: {
        forecasts: project_1.default.forecastsConnection
    }
};
//# sourceMappingURL=index.js.map