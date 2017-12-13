const fs = require('fs')

const cleanup = (max = 24 * 60 * 60 * 1000 + Date.now()) =>
  fs.readdirSync('./files/')
    .filter(e => parseInt(e.slice(0, e.lastIndexOf('.') - 1) || 0 < max))
    .forEach(e => fs.unlinkSync('./files/' + e))

let last = 0
module.exports = (req, res, next) => {
  if (last + (60 * 60 * 1000) < Date.now()) {
    cleanup()
    last = Date.now()
  }

  next()
}
