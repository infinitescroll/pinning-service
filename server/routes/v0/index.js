const router = require('express').Router()
module.exports = router

router.use('/files', require('./files'))
router.use('/dag', require('./dag'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
