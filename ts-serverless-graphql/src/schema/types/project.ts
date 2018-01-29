export default `
  type Project implements Node, Timestamped {
    id: ID!
    name: String!
    harvestId: String
    forecasts: ForecastConnection
    boo: String
    createdAt: String!
    updatedAt: String!
  }
  
  type ProjectEdge {
    cursor: String
    node: Project
  }
  
  type ProjectConnection {
    edges: [ProjectEdge]
  }
  
  input CreateProjectInput {
    name: String!
    harvestId: String
  }
  
  input UpdateProjectInput {
    id: ID!
    name: String!
    harvetId: String
  }
  
  input DeleteProjectInput {
    id: ID!
  }
`
