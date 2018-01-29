const faker = require('faker')
const jsonfile = require('jsonfile')
const shortid = require('shortid')

const seedProjects = 10
const seedForecastsPerProject = 20

// Project Type
const project = () => ({
  id: shortid.generate(),
  harvestId: faker.random.number().toString(),
  name: faker.company.companyName(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
})

// Forecast Type
const forecast = ({ projectId }) => ({
  id: shortid.generate(),
  date: faker.date.future(),
  hours: faker.random.number(),
  projectId,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
})

// Make Project records with Unique Ids
const generateProjects = () => {
  let records = 0
  const projects = []
  while (records < seedProjects) {
    projects.push(project())
    records = records + 1
  }

  return projects
}

// Use Project Records to link a projects ID to a forecast
const generateForecasts = projects => {
  let forecasts = []
  projects.map(({ id }) => {
    let records = 0
    while (records < seedForecastsPerProject) {
      forecasts.push(forecast({ projectId: id }))
      records = records + 1
    }
  })

  return forecasts
}

const projects = generateProjects()
const forecasts = generateForecasts(projects)

const projectsFile = 'projects.json'
const forecastsFile = 'forecasts.json'

const log = (err, file) =>
  (err && console.error(err)) || console.log(`${file} Seed File Generated`)

// Generate Seed Files
jsonfile.writeFile(projectsFile, projects, err => log(err, 'Projects'))
jsonfile.writeFile(forecastsFile, forecasts, err => log(err, 'Forecasts'))
