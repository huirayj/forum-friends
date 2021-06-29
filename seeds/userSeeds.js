const { User } = require('../models');

const userData = [
    {
        username: 'User1',
        email: 'user1@gmail.com',
        password: 'password123'
    },
    {
        username: 'User2',
        email: 'user2@gmail.com',
        password: 'password123'
    },
    {
        username: 'User3',
        email: 'user3@gmail.com',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
});

module.exports = seedUsers;