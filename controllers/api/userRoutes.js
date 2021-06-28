const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allUserData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(allUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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

router.post('/', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const aUserData = await User.findOne({
            where: { email: req.body.email }
        });
        const validPassword = aUserData.checkPassword(req.body.password);

        if (!aUserData) {
            res.status(400).json({ message: 'No user with that email address' });
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

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updUserData = await User.update(req.body, {
            individualHooks: true,
            where: { id: req.params.id }
        });

        (!aUserData[0]) ?
            res.status(404).json({ message: 'No user found with that id' }) :
            res.status(200).json(updUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const rmUserData = await User.destroy({
            where: { id: req.params.id }
        });

        (!rmUserData) ?
            res.status(404).json({ message: 'No user found with that id' }) :
            res.json(rmUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;