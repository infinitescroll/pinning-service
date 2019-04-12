const { dagPut } = require('../helpers')

const computeDagHash = async (req, res, next) => {
  try {
    const cid = await dagPut(req.body)
    req.cid = cid
    next()
  } catch (error) {
    const err = new Error('Error dag putting file to IPFS', error)
    err.status = 500
    next(err)
  }
}

module.exports = computeDagHash
