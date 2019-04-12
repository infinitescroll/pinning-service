var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })

const add = (data, options = {}) =>
  new Promise((resolve, reject) => {
    ipfs.add(data, options, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })

const dagPut = dag =>
  new Promise((resolve, reject) => {
    ipfs.dag.put(dag, {}, (err, cid) => {
      if (err) reject(err)
      else resolve(cid.toBaseEncodedString())
    })
  })

const pin = cid =>
  new Promise((resolve, reject) => {
    ipfs.pin.add(cid, err => {
      if (err) reject(err)
      else resolve()
    })
  })

module.exports = {
  add,
  dagPut,
  pin
}
