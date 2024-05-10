const {prisma} = require('../prisma/prisma-client')

const likeController = {
    like: async (req, res) => {
        try {
            const {postId} = req.body
            const userId = req.user.userId

            if (!postId) {
                return res.status(400).json({message: 'Все поля обязательны'})
            }

            const existingLike = await prisma.like.findFirst({
                where: {postId, userId}
            })

            if (existingLike) {
                return res.status(403).json({message: 'Этот пост уже содержит лайк'})
            }

            const like = await prisma.like.create({
                data: {postId, userId}
            })

            res.status(201).json(like)
        } catch (error) {
            console.error('Error in like:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    unlike: async (req, res) => {
        try {
            const {id} = req.params
            const userId = req.user.userId

            if (!id) {
                return res.status(400).json({message: 'Все поля обязательны'})
            }

            const existingLike = await prisma.like.findFirst({
                where: {postId: id, userId}
            })

            if (!existingLike) {
                return res.status(403).json({message: 'Нельзя поставить дизлайк'})
            }

            const like = await prisma.like.deleteMany({
                where: {postId: id, userId}
            })

            res.status(200).json(like)
        } catch (error) {
            console.error('Error in unlike:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    }
}

module.exports = likeController
