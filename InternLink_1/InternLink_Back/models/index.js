const sequelize = require("../config/db");
const User = require("./User");

const initModels = async () => {
  await sequelize.sync(); // { force: true } to reset tables
};

module.exports = { sequelize, User, initModels };
