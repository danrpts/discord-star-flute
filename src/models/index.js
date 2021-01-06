const fs = require("fs");
const { Sequelize } = require("sequelize");
const SoundModel = require("./sound-model");
const GreetingModel = require("./greeting-model");

const sequelize = new Sequelize(process.env.DATABASE_URL);
const Sound = SoundModel(sequelize, Sequelize);
const Greeting = GreetingModel(sequelize, Sequelize);
Sound.hasMany(Greeting, {
  onDelete: "CASCADE"
});
Greeting.belongsTo(Sound, {
  foreignKey: {
    allowNull: false
  }
});

(async () => {
  await sequelize.sync({ alter: true });
})();

module.exports = { Sound, Greeting };
