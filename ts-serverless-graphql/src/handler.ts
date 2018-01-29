import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda'
import lambdaPlayground from 'graphql-playground-middleware-lambda'

import { resolve, mutate } from './data'
import * as db from './db'
import schema from './schema'

export function graphql(event, context, callback) {
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    callback(error, outputWithHeader)
  }

  const mergeContext = {
    resolve: resolve(db),
    db,
    event,
    mutate: mutate(db),
    ...context
  }

  graphqlLambda({ schema, context: mergeContext, tracing: true })(
    event,
    context,
    callbackFilter
  )
}

// for local endpointURL is /graphql and for prod it is /stage/graphql
export const playground = lambdaPlayground({
  endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql'
})

export const graphiql = graphiqlLambda({
  endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql'
})
