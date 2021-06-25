const { Post } = require('../models');

const postData = [
    {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: 1
    },
    {
        content: 'Phasellus congue dignissim erat, nec consequat nisi.',
        user_id: 2
    },
    {
        content: 'Aenean viverra eu dui a lobortis.',
        user_id: 3
    },

];

const seedUsers = () => User.bulkCreate(userData);