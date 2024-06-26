const fs = require("fs");
const express = require('express')
const multer = require('multer')
const {userController, postController, commentController, likeController, followController} = require("../controllers");
const authenticateToken = require("../middleware/auth");
const router = express.Router()

// Указываем, где хранить файлы
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploads = multer({storage})

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads')
}

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current', authenticateToken, userController.current)
router.get('/users/:id', authenticateToken, userController.getById)
router.put('/users/:id', authenticateToken, uploads.single('avatar'), userController.update)

router.post('/posts', authenticateToken, postController.create)
router.get('/posts', authenticateToken, postController.getAll)
router.get('/posts/:id', authenticateToken, postController.getById)
router.delete('/posts/:id', authenticateToken, postController.delete)

router.post('/comments', authenticateToken, commentController.create)
router.delete('/comments/:id', authenticateToken, commentController.delete)

router.post('/like', authenticateToken, likeController.like)
router.delete('/unlike/:id', authenticateToken, likeController.unlike)

router.post('/follow', authenticateToken, followController.follow)
router.delete('/unfollow/:id', authenticateToken, followController.unfollow)

module.exports = router
