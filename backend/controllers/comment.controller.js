const {prisma} = require('../prisma/prisma-client')

const commentController = {
    create: async (req, res) => {
        try {
            const {postId, content} = req.body
            const userId = req.user.userId

            if (!postId || !content) {
                return res.status(404).json({message: 'Все поля обязательны'})
            }

            const comment = await prisma.comment.create({
                data: {postId, userId, content}
            })

            res.status(200).json(comment)
        } catch (error) {
            console.error('Error in create:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params
            const userId = req.user.userId

            const comment = await prisma.comment.findUnique({where: {id}})

            if (!comment) {
                return res.status(404).json({message: 'Комментарий не найден'})
            }

            if (comment.userId !== userId) {
                return res.status(403).json({message: 'Нет доступа'})
            }

            await prisma.comment.delete({where: {id}})

            res.status(200).json(comment)
        } catch (error) {
            console.error('Error in delete:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    }
}

module.exports = commentController
