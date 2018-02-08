const React = require('react')

// Checks if the value is null
const isNil = value => value === null || value === undefined

// Returns a new component which is rendered only when the predicate is true
// Returns a function that produces React element and takes the props to apply on it.
const Branch = states => DefaultComponent => props => {
  const state = states.find(({ when }) => when(props))
  let output = isNil(state) ? DefaultComponent : state.render
  return React.createFactory(output)(props)
}

// Calls the update function only when the predicate is true
// Returns a function that takes props or other values and calls the update function to update the state tree
const applyUpdate = states => defaultState => props => {
  const state = states.find(({ when }) => when(props))
  return isNil(state) ? defaultState : state.update(props)
}

module.exports = {
  Branch,
  applyUpdate
}
