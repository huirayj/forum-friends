const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }]
        });
        res.status(200).json(allPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const aPostData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }]
        });
        (!aPostData) ?
            res.status(404).json({ message: 'No post found with that id' }) :
            res.status(200).json(aPostData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(newPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updPostData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
            {
                where: { id: req.params.id }
            });

        (!updPostData) ?
            res.status(404).json({ message: 'No post found with that id' }) :
            res.status(200).json(updPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const rmPostData = await Post.destroy({
            where: { id: req.params.id }
        });

        (!rmPostData) ?
            res.status(404).json({ message: 'No post found with that id' }) :
            res.status(200).json(rmPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;