const seedUsers = require('./user-seed');
const seedPosts = require('./user-post');

const sequelize = require('../config/connection');

const seedDb = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();

    process.exit(0);
}

seedDb();