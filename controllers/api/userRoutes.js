const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// finds user by id
router.get('/:id', async (req, res) => {
    try {
        const aUserData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }]
        });

        (!aUserData) ?
            res.status(400).json({ message: 'No user found with that id' }) :
            res.status(200).json(aUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/signup', async (req, res) => {
    const newUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    req.session.save(() => {
        req.session.user_id = newUserData.id;
        req.session.username = newUserData.username;
        req.session.loggedIn = true;

        res.status(200).json(newUserData);
    });
});

// user login
router.post('/', async (req, res) => {
    try {
        const aUserData = await User.findOne({
            where: { email: req.body.email }
        });

        const validPassword = aUserData.checkPassword(req.body.password);

        if (!aUserData) {
            res.status(400).json({ message: 'No user with that email' });
            return;
        }

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = aUserData.id;
            req.session.username = aUserData.username;
            req.session.loggedIn = true;

            res.json({ user: aUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// user logout
router.post('/logout', (req, res) => {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
