const { ImageObject } = require('../../db')
const { pin } = require('../../helpers')

const imageObject = async (req, res, next) => {
  const cid = req.cid

  // add validation here

  ImageObject.findOrCreate(cid, { ...req.body, _id: cid }, (err, image) => {
    if (err) next(err)
  })

  try {
    await pin(cid)
    res.send(cid)
  } catch (err) {
    const error = new Error(`error pinning file: ${err}`)
    error.status = 500
    next(error)
  }
}

module.exports = imageObject
