module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    name: DataTypes.STRING,
    eaten: DataTypes.BOOLEAN
  });
  return Burger;
};
