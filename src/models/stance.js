module.exports = (sequelize, DataTypes) => {
  const stance = sequelize.define('stance', {
    name: DataTypes.STRING,
    topicId: DataTypes.INTEGER,
  }, {});

  stance.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    stance.belongsTo(models.topic);
    stance.belongsToMany(models.constituent, { through: 'constituent_stance' });
  };

  return stance;
};
