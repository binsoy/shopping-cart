import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import GridFSStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { connection } from '../config/db.js'

const router = express.Router()

// Init gfs
let gfs

connection.once('open', () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo)
  gfs.collection('uploads')
})

// // Create storage engine
const storage = new GridFSStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})

const upload = multer({ storage })

router.post('/', authMiddleware, isAdmin, upload.single('file'), (req, res) => {
  res.status(200).json({
    imageUrl: `/api/uploads/image/${req.file.filename}`,
  })
})

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      })
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({
        err: 'Not an image',
      })
    }
  })
})

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/:filename', authMiddleware, isAdmin, (req, res) => {
  gfs.remove(
    { filename: req.params.filename, root: 'uploads' },
    (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err })
      }

      res.status(200).json({ message: 'Successfully deleted file' })
    }
  )
})

export default router
