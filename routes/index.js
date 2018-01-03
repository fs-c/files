const si = require('systeminformation')

const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => {
  // Get fs information, render anyways if error.
  si.fsSize()
    .then(data => res.render('index', { data }))
    .catch(err => res.render('index'))
})