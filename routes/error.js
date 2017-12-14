const handle = (err, req, res, next) => {
  res.status(500).render('status', {
    status: 'error',
    head: err.message.length < 100 ? err.message : '',
    message: err.message.length > 100 ? err.message : ' '
  })
}

module.exports = handle