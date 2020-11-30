module.exports = (sequelize, DataTypes) => {
  const topic = sequelize.define('topic', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});

  topic.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    topic.hasMany(models.stance);
    topic.belongsToMany(models.voter, { through: 'interests' });
  };

  return topic;
};
