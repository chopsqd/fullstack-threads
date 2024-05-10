const {prisma} = require('../prisma/prisma-client')

const followController = {
    follow: async (req, res) => {
        try {
            const {followingId} = req.body
            const userId = req.user.userId

            if (followingId === userId) {
                return res.status(403).json({message: 'Нельзя подписаться на самого себя'})
            }

            const existingSub = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId}
                    ]
                }
            })

            if (existingSub) {
                return res.status(403).json({message: 'Подписка уже существует'})
            }

            const sub = prisma.follows.create({
                data: {
                    follower: {connect: {id: userId}},
                    following: {connect: {id: followingId}}
                }
            })

            res.status(201).json(sub)
        } catch (error) {
            console.error('Error in follow:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    },
    unfollow: async (req, res) => {
        try {
            const {followingId} = req.body
            const userId = req.user.userId

            const existingSub = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId}
                    ]
                }
            })

            if (!existingSub) {
                return res.status(404).json({message: 'Подписка отсутствует'})
            }

            const sub = await prisma.follows.delete({
                where: {id: existingSub.id}
            })

            res.status(200).json(sub)
        } catch (error) {
            console.error('Error in unfollow:', error)
            res.status(500).json({message: 'Internal server error: ' + error})
        }
    }
}

module.exports = followController
