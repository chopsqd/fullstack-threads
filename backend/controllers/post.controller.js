const {prisma} = require('../prisma/prisma-client')

const postController = {
    create: async (req, res) => {
        try {
            const {content} = req.body
            const authorId = req.user.userId

            if (!content) {
                return res.status(400).json({message: 'Все поля обязательны'})
            }

            const post = await prisma.post.create({
                data: {content, authorId}
            })

            res.status(200).json(post)
        } catch (error) {
            console.error('Error in create:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    getAll: async (req, res) => {
        try {
            const userId = req.user.userId

            const posts = await prisma.post.findMany({
                include: {
                    likes: true,
                    author: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            const postsWithLikesInfo = posts.map(post => ({
                ...post,
                likedByUser: post.likes.some(like => like.userId === userId)
            }))

            res.status(200).json(postsWithLikesInfo)
        } catch (error) {
            console.error('Error in getAll:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    getById: async (req, res) => {
        try {
            const {id} = req.params
            const userId = req.user.userId

            const post = prisma.post.findUnique({
                where: {id},
                include: {
                    comments: {
                        include: {
                            user: true
                        }
                    },
                    likes: true,
                    author: true
                }
            })

            if (!post) {
                return res.status(404).json({message: 'Пост не найден'})
            }

            const postWithLikeInfo = {
                ...post,
                likedByUser: post.likes.some(like => like.userId === userId)
            }

            res.status(200).json(postWithLikeInfo)
        } catch (error) {
            console.error('Error in getById:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params

            const post = await prisma.post.findUnique({
                where: {id}
            })

            if (!post) {
                return res.status(404).json({message: 'Пост не найден'})
            }

            if (post.authorId !== req.user.userId) {
                return res.status(403).json({message: 'Нет доступа'})
            }

            const transaction = await prisma.$transaction([
                prisma.comment.deleteMany({where: {postId: id}}),
                prisma.like.deleteMany({where: {postId: id}}),
                prisma.post.delete({where: {id}})
            ])

            res.status(200).json(transaction)
        } catch (error) {
            console.error('Error in delete:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    }
}

module.exports = postController
