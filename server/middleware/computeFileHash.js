const { add } = require('../helpers')

const isValidFile = file => {
  const requiredFields = ['data', 'size', 'encoding', 'mimetype']
  return requiredFields.every(field => file[field])
}

const computeFileHash = async (req, res, next) => {
  const { file } = req.files
  if (!file) {
    const err = new Error(`No file was sent`)
    err.status = 400
    next(err)
  } else if (!isValidFile(file)) {
    const err = new Error(`Unsupported file`)
    err.status = 400
    next(err)
  }

  try {
    const [{ hash }] = await add(file.data, { onlyHash: true })
    req.cid = hash
    next()
  } catch (error) {
    const err = new Error('Error dag putting file to IPFS', error)
    err.status = 500
    next(err)
  }
}

module.exports = computeFileHash
