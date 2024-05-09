const fs = require("fs");
const express = require('express')
const multer = require('multer')
const {userController} = require("../controllers");
const authenticateToken = require("../middleware/auth");
const router = express.Router()

// Указываем, где хранить файлы
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage })

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads')
}

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current', authenticateToken, userController.current)
router.get('/users/:id', authenticateToken, userController.getById)
router.put('/users/:id', authenticateToken, userController.update)

module.exports = router
