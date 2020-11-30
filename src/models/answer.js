module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    description: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  answer.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    answer.belongsTo(models.question);
  };

  return answer;
};
