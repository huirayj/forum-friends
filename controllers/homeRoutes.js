const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// router.get('/signup', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
//     res.render('signup');
// });

<<<<<<< Updated upstream
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
        }).map(post => post.get({ plain: true }));

        res.status(200).render('homepage', {
            allPostData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
=======
// router.get('/', async (req, res) => {
//     try {
//         const allPostData = await Post.findAll({
//             attributes: ['id', 'title', 'content', 'created_at'],
//             include: [
//                 {
//                 model: Comment,
//                 attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//         })
//         const posts = allPostData.map(post => post.get({ plain: true }));

//         res.render('homepage', {
//             posts,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
>>>>>>> Stashed changes


// router.get('/post/:id', async (req, res) => {
//     try {
//         const aPostData = await Post.findByPk(req.params.id, {
//             attributes: ['id', 'title', 'content', 'created_at'],
//             include: [{
//                 model: Comment,
//                 attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }]
//         });
    
//         if (!aPostData) {
//             res.status(404).json({ message: 'No post found with that id' });
//         } else {
//             const post = aPostData.get({ plain: true });
    
<<<<<<< Updated upstream
            res.status(200).render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
=======
//             res.render('single-post', {
//                 post,
//                 loggedIn: req.session.loggedIn
//             });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
>>>>>>> Stashed changes

module.exports = router;