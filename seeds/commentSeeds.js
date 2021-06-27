const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        content: "Wow!"
    },
    {
        user_id: 2,
        post_id: 2,
        content: "Fake."
    },
    {
        user_id: 2,
        post_id: 3,
        content: "Cool."
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;