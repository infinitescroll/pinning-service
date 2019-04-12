const supportedSchemas = require('../config/supportedSchemas')

const checkSchemaSupported = async (req, res, next) => {
  const context = req.body['@context']
  const type = req.body['@type']
  if (!!supportedSchemas[context] && supportedSchemas[context].has(type)) {
    next()
  } else {
    const err = new Error(`Unsupported schema type: ${context} ${type}`)
    err.status = 400
    next(err)
  }
}

module.exports = checkSchemaSupported
