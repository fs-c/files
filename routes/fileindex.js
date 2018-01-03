const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => 
  res.render('fileIndex', {
    files: require('fs').readdirSync('./files')
  }))