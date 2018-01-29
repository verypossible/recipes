export default {
  RootQuery: {
    allForecasts: (parent, args, { resolve }) => resolve.allForecasts()
  }
}
