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

router.post('/', upload.array('files'), (req, res, next) => {
  if (!req.files[0])
    next(new Error('No file(s) provided.'))

  res.render('status', {
    status: 'ok',
    message: `${req.files.length} files uploaded successfully.`,
    files: req.files
  })
})

router.get('/', (req, res) => res.redirect('../'))