"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forecast_1 = require("./forecast");
const project_1 = require("./project");
const interfaces_1 = require("./interfaces");
const Query = `
  type Query {
    allProjects: ProjectConnection
    project(id: ID!): Project
    allForecasts: [Forecast]
  }
`;
const Mutation = `
  type Mutation {
    createProject(input: CreateProjectInput): Project
    updateProject(input: UpdateProjectInput): Project
    deleteProject(input: DeleteProjectInput): Project
  }
`;
exports.default = [Query, Mutation, interfaces_1.default, project_1.default, forecast_1.default];
//# sourceMappingURL=index.js.map