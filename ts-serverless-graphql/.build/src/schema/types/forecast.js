"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type Forecast implements Node, Timestamped {
    id: ID!
    date: String!
    hours: Float!
    projectId: ID!
    createdAt: String!
    updatedAt: String!
  }
  
  type ForecastEdge {
    cursor: String
    node: Forecast
  }
  
  type ForecastConnection {
    edges: [ForecastEdge]
  }
`;
//# sourceMappingURL=forecast.js.map