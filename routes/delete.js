const router = require('express').Router()

module.exports = router

const fs = require('fs')
const glob = require('glob')

router.get('/:path', (req, res, next) => {
  const success = [  ], error = [  ]

  const files = glob.sync('./files/' + req.params.path) || [  ]

  if (!files[0])
    next(new Error('No file(s) match that query.'))

  for (const file of files) 
    try { 
      fs.unlinkSync(file)
      success.push(file)
    } catch(e) { error.push(file) }

  res.render('status', {
    status: 'ok',
    message: `Deleted ${success.length} file(s)` + 
      `${error ? `, failed deleting ${error.length} file(s)` : ''}.`
  })
})