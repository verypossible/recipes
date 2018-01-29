// import * as DataLoader from 'dataloader'

import * as projects from './projects'
import * as forecasts from './forecasts'

export const resolve = db => {
  // const createLoader = func => new DataLoader(func(db))
  return {
    allProjects: projects.getProjects(db),
    project: projects.getProject(db),
    allForecasts: forecasts.getForecasts(db),
    forecastsByProject: forecasts.queryForecasts(db)
  }
}

export const mutate = db => ({
  createProject: projects.createProject(db),
  updateProject: projects.updateProject(db),
  deleteProject: projects.deleteProject(db)
})
