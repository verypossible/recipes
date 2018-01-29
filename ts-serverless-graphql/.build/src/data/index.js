"use strict";
// import * as DataLoader from 'dataloader'
Object.defineProperty(exports, "__esModule", { value: true });
const projects = require("./projects");
const forecasts = require("./forecasts");
exports.resolve = db => {
    // const createLoader = func => new DataLoader(func(db))
    return {
        allProjects: projects.getProjects(db),
        project: projects.getProject(db),
        allForecasts: forecasts.getForecasts(db),
        forecastsByProject: forecasts.queryForecasts(db)
    };
};
exports.mutate = db => ({
    createProject: projects.createProject(db),
    updateProject: projects.updateProject(db),
    deleteProject: projects.deleteProject(db)
});
//# sourceMappingURL=index.js.map