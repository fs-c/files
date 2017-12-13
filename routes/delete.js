const router = require('express').Router()

module.exports = router

const fs = require('fs')
const glob = require('glob')

router.get('/:path', (req, res) => {
  const files = glob.sync('./files/' + req.params.path) || [  ]

  for (const file of files) try { fs.unlinkSync(file) } catch(e) {}

  res.redirect('../')
})