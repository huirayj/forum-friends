const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedDb = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedPosts();
    await seedComments();

    process.exit(0);
}

seedDb();