const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/', async (req, res) => {
    try {
        const allPostData = await Post.findAll({
            attributes: ['id', 'title', 'post_content', 'created_at'],
            include: [
                {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'create_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
        }).map(post => post.get({ plain: true }));

        res.status(200).render('homepage', {
            allPostData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {
        const aPostData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'post_content', 'created_at'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'create_at'],
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
    
            res.status(200).render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;