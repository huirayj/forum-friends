const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts and orders them by time posted
router.get('/', withAuth, async (req, res) => {
    try {
        const allPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            order: [['created_at', 'DESC']],
            include: [{
                model: Comment,
                attributes: ['id', 'content', 'created_at', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }]
        })
        const posts = allPostData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// edit post by id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const aPostData = await Post.findByPk(req.params.id, {
            include: [{
                model: Comment,
                attributes: ['id', 'content', 'created_at', 'post_id', 'user_id'],
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

        if (!aPostData) {
            res.status(404).json({ message: 'No post found with that id' });
        } else {
            const post = aPostData.get({ plain: true });

            res.render('edit', {
                post,
                loggedIn: true
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;