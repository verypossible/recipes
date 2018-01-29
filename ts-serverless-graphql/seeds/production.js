// Load the AWS SDK for Node.js
const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({ region: 'us-east-1' })

const docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing projects and forecasts into DynamoDB. Please wait.')

const projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'))
const forecasts = JSON.parse(fs.readFileSync('forecasts.json', 'utf8'))

function insert(items, table) {
  return items.map(Item => {
    const params = {
      TableName: table,
      Item
    }

    docClient.put(params, (err, data) => {
      if (err) {
        console.error(
          `Unable to add ${table}`,
          Item.name,
          '. Error JSON:',
          JSON.stringify(err, null, 2)
        )
      } else {
        console.log('PutItem succeeded')
      }
    })
  })
}

insert(projects, 'projects')
insert(forecasts, 'forecasts')

// projects.forEach(function(project) {
//   const params = {
//     TableName: 'projects',
//     Item: project,
//   };
//

// });
