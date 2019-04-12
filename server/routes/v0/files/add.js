const router = require('express').Router()

const { computeFileHash } = require('../../../middleware')
const { add } = require('../../../helpers')

module.exports = router

router.post('/', computeFileHash, async (req, res, next) => {
  res.send(req.cid)
  try {
    await add(req.files.file.data)
  } catch (error) {
    const err = new Error('Error pinning file to IPFS', error)
    err.status = 500
    next(err)
  }
})
