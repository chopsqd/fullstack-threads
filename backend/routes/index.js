const express = require('express')
const multer = require('multer')
const router = express.Router()

// Указываем, где хранить файлы
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage })

router.get('/register', (req, res) => {
    res.send('register')
})

module.exports = router
