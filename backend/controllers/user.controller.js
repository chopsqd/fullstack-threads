const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jdenticon = require('jdenticon')
const jwt = require('jsonwebtoken')
const {prisma} = require("../prisma/prisma-client");

const userController = {
    register: async (req, res) => {
        try {
            const {email, password, name} = req.body

            if (!email || !password || !name) {
                return res.status(400).json({message: 'Все поля обязательны'})
            }

            if (password.length < 5) {
                return res.status(400).json({message: 'Пароль слишком короткий'})
            }

            const candidate = await prisma.user.findUnique({
                where: {email}
            })

            if (candidate) {
                return res.status(400).json({message: 'Пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const png = jdenticon.toPng(name, 200)
            const avatarName = `${name}_${Date.now()}.png`
            const avatarPath = path.join(__dirname, '/../uploads', avatarName)
            fs.writeFileSync(avatarPath, png)

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    avatarUrl: `/uploads/${avatarName}`
                }
            })

            res.status(201).json(user)
        } catch (error) {
            console.error('Error in register:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body

            if (!email || !password) {
                return res.status(400).json({message: 'Все поля обязательны'})
            }

            const user = await prisma.user.findUnique({
                where: {email}
            })

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Неверный логин или пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                process.env.SECRET_KEY
            )

            res.status(200).json({token})
        } catch (error) {
            console.error('Error in login:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    getById: async (req, res) => {
        try {
            const {id} = req.params
            const userId = req.user.userId

            const user = await prisma.user.findUnique({
                where: {id},
                include: {
                    followers: true,
                    following: true
                }
            })

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }

            const isFollowing = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId: id}
                    ]
                }
            })

            res.status(200).json({...user, isFollowing: Boolean(isFollowing)})
        } catch (error) {
            console.error('Error in getById:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    update: async (req, res) => {
        try {
            const {id} = req.params
            const {email, name, birthDate, bio, location} = req.body

            let avatarUrl = undefined
            if (req.file && req.file.path) {
                avatarUrl = req.file.path
            }

            if (!email) {
                return res.status(400).json({message: 'Email не может быть пустым'})
            }

            if (id !== req.user.userId) {
                return res.status(403).json({message: 'Нет доступа'})
            }

            const candidate = await prisma.user.findFirst({
                where: {email}
            })
            
            if (candidate && candidate.id !== id) {
                return res.status(400).json({message: 'Почта уже используется'})
            }

            const user = await prisma.user.update({
                where: {id},
                data: {email, name, avatarUrl, birthDate, bio, location}
            })

            res.status(200).json(user)
        } catch (error) {
            console.error('Error in update:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    current: async (req, res) => {
        try {
            const user = await prisma.user.findUnique({
                where: {id: req.user.userId},
                include: {
                    followers: {
                        include: {
                            follower: true
                        }
                    },
                    following: {
                        include: {
                            following: true
                        }
                    }
                }
            })

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }

            res.status(200).json(user)
        } catch (error) {
            console.error('Error in current:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    }
}

module.exports = userController
