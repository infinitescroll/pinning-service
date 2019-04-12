const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001
const app = express()
module.exports = app

// // This is a global Mocha hook, used for resource cleanup.
// // Otherwise, Mocha v4+ never quits after tests.
// if (process.env.NODE_ENV === 'test') {
//   after('close the session store', () => sessionStore.stopExpiringSessions())
// }

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(fileUpload())

  // compression middleware
  app.use(compression())

  app.use('/api/v0', require('./routes/v0'))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

const startDb = () => {
  mongoose.connect('mongodb://localhost/pinning', { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', async () => {
    await createApp()
    await startListening()
  })
}

async function bootApp() {
  await startDb()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
