const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => 
  res.render('index', {
    files: require('fs').readdirSync('./files')
  }))