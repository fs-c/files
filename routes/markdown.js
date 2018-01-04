const fs = require('fs')
const marked = require('marked')

const router = require('express').Router()

module.exports = router

router.get('/', (req, res, next) => {
  let file = req.originalUrl

  try {
    file = fs.readFileSync('./files' + file, 'utf8')
  } catch(e) { return next(e) }

  res.render('markdown', { markdown: marked(file) })
})