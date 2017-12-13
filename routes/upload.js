const id = require('shortid')

const router = require('express').Router()

module.exports = router

const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: 'files/',
    filename: (req, f, cb) =>
      cb(null,
         id.generate() + f.originalname.slice(f.originalname.lastIndexOf('.')))
  }),
  limits: { fieldSize: 1024 * 1024 * 1024 }
})

router.post('/', upload.array('files'), (req, res) =>
  res.render('status', { files: req.files }))

router.get('/', (req, res) => res.redirect('../'))