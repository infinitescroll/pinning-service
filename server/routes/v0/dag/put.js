const router = require('express').Router()

const handlers = require('../../../handlers')
const { checkValidType, computeDagHash } = require('../../../middleware')

module.exports = router

router.post('/', checkValidType, computeDagHash, async (req, res, next) => {
  const type = req.body['@type']
  const handle = handlers[type]
  await handle(req, res, next)
})
