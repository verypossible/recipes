import Forecast from './forecast'
import Project from './project'
import Interfaces from './interfaces'

const Query = `
  type Query {
    allProjects: ProjectConnection
    project(id: ID!): Project
    allForecasts: [Forecast]
  }
`

const Mutation = `
  type Mutation {
    createProject(input: CreateProjectInput): Project
    updateProject(input: UpdateProjectInput): Project
    deleteProject(input: DeleteProjectInput): Project
  }
`

export default [Query, Mutation, Interfaces, Project, Forecast]
