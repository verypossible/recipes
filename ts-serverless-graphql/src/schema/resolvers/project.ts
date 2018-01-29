// Signature: (root, args, context) => resolver(variables)

export default {
  RootQuery: {
    allProjects: (root, args, { resolve }) => resolve.allProjects(),
    project: (root, { id }, { resolve }) => {
      return resolve.project(id)
    }
  },
  RootMutation: {
    createProject: (root, args, { mutate }) => mutate.createProject(args),
    updateProject: (root, args, { mutate }) => mutate.updateProject(args),
    deleteProject: (root, args, { mutate }) => mutate.deleteProject(args)
  },
  forecastsConnection: (project, args, { resolve }) =>
    resolve.forecastsByProject({ projectId: project.id })
}
