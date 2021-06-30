const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

const getCurrentUser = async (id) => {
    const userData = await User.findByPk(id);
    const user = userData.get({ plain: true });

    return user;
}

// renders all posts by time posted
router.get('/posts', withAuth, async (req, res) => {
    const user = await getCurrentUser(req.session.user_id);
    const postData = await Post.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
            order: [['created_at', 'DESC']],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    });
    const posts = postData.map(p => p.get({plain : true}));
    
    res.render('posts', {posts, user, loggedIn: req.session.loggedIn});
});

// user signup
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// gets renders all posts
router.get('/', async (req, res) => {
    try {
        const allPostData = await Post.findAll({
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
            }
        ]
        })
        const posts = allPostData.map(post => post.get({ plain: true }));

        res.render('login', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;