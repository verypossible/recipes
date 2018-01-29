import forecast from './forecast'
import project from './project'

export default {
  Query: {
    ...forecast.RootQuery,
    ...project.RootQuery
  },
  Mutation: {
    ...project.RootMutation
  },
  Project: {
    forecasts: project.forecastsConnection
  }
}
