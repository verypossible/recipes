import { graphql, playground } from './handler'

it('handler.graphql should be a function', () => {
  expect(typeof graphql).toBe('function')
})

it('handler.playground should be a function', () => {
  expect(typeof playground).toBe('function')
})
