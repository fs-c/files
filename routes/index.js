const si = require('systeminformation')

const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => {
  si.fsSize().then(data => res.render('index', { data })).catch(console.error)
})