const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');

const getCurrentUser = async (id) => {
    const userData = await User.findByPk(id);
    const user = userData.get({ plain: true });
    return user;
}

router.get('/posts', async (req, res) => {
    const user = await getCurrentUser(req.session.user_id);
    const postData = await Post.findAll({
        order: [['created_at', 'DESC']],
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
    const posts = postData.map(p => p.get({plain : true}));
    console.log(user);
    res.render('posts', {posts, user});
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

router.get('/post/:id', async (req, res) => {
    try {
        const aPostData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
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
    
        if (!aPostData) {
            res.status(404).json({ message: 'No post found with that id' });
        } else {
            const post = aPostData.get({ plain: true });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts', async (req, res) => {
    try {
        const allCommentData = await Comment.findAll({});
        
        res.status(200).json(allCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;