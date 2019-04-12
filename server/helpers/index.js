const { dagPut, add, pin } = require('./ipfs')
const { createUrl } = require('./createUrl')

module.exports = {
  add,
  createUrl,
  dagPut,
  pin
}
