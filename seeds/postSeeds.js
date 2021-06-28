const { Post } = require('../models');

const postData = [
    {
        title: 'Lorem ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: 1
    },
    {   
        title: 'Phasellus congue',
        content: 'Phasellus congue dignissim erat, nec consequat nisi.',
        user_id: 2
    },
    {
        title: 'Aenean viverra',
        content: 'Aenean viverra eu dui a lobortis.',
        user_id: 3
    },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;