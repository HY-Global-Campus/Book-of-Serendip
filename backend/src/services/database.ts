import { Sequelize } from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize(config.DB_URL, {dialect: 'postgres'});

import User from '../models/user.js';
import BookOne from '../models/BookOne.js';

User.initialize(sequelize);
BookOne.initialize(sequelize);

// Setup associations

User.hasOne(BookOne, { foreignKey: 'userId' });
BookOne.belongsTo(User, { foreignKey: 'userId' });

export const dbSync = async () => {
  try {
    await sequelize.sync({ force: false }); // Use force: false to avoid dropping tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Failed to synchronize database:", error);
  }
};

export default sequelize;
