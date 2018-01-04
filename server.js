const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.enable('trust proxy')

// Basic security and logging.
app.use(require('helmet')())
app.use(require('morgan')('dev', {
  stream: { write: msg => require('./logger').verbose(msg.trim()) }
}))

if (process.env.NODE_ENV === 'dev')
  app.get('/files/*', (req, res) =>
    res.redirect('/' + req.originalUrl.slice(7)))

// Call cleanup at every request.
app.use(require('./scripts/cleanup'))

// Serve resources.
app.use(express.static('public'))

// Serve index page.
app.use('/', require('./routes/index'))

// Serve file index.
app.use('/index', require('./routes/fileindex'))

// API.
app.use('/upload', require('./routes/upload'))
app.use('/delete', require('./routes/delete'))

// Render *.md files properly.
app.use('/*.md', require('./routes/markdown'))

// Serve files.
app.use(express.static('files'))

// Catch-all for errors.
app.use(require('./routes/error'))

app.listen(8084)