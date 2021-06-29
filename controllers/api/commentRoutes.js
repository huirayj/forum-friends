const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allCommentData = await Comment.findAll({});
        res.status(200).json(allCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const newCommentData = await Comment.create({
                content: req.body.content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            });
            
            res.status(200).json(newCommentData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const rmCommentData = await Comment.destroy({
            where: { id: req.params.id }
        });
        (!rmCommentData) ?
            res.status(404).json({ message: 'No comment found with that id' }) :
            res.json(rmCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;