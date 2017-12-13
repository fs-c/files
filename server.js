const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.enable('trust proxy')

app.use(require('helmet')())
app.use(require('morgan')('dev', {
  stream: { write: msg => require('./logger').verbose(msg.trim()) }
}))

app.use(require('./scripts/cleanup'))

app.use(express.static('public'))

app.use('/index', require('./routes/index'))
app.use('/upload', require('./routes/upload'))
app.use('/delete', require('./routes/delete'))

app.use(express.static('files'))

app.listen(8084)