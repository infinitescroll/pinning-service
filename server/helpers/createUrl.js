const createUrl = endpoint => {
  // should check if this is a test or prod environment
  return `localhost:3001/${endpoint}`
}

module.exports = { createUrl }
