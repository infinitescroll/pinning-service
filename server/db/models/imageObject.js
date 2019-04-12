const mongoose = require('mongoose')
const { Schema } = mongoose

const imageObjectSchema = new Schema({
  _id: String,
  '@context': {
    type: String,
    required: true
  },
  '@type': {
    type: String,
    required: true
  },
  contentUrl: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: false
  },
  encodingFormat: {
    type: String,
    required: false
  },
  contentSize: {
    type: Number,
    required: false
  }
})

imageObjectSchema.statics.findOrCreate = function(cid, data, callback) {
  const self = this
  self.findById(cid, (err, image) => {
    if (err) callback(err, null)
    else if (image) callback(null, image)
    else {
      self.create(data, function(error, createdImage) {
        if (err) callback(error, null)
        else callback(null, createdImage)
      })
    }
  })
}

module.exports = mongoose.model('ImageObjects', imageObjectSchema)
