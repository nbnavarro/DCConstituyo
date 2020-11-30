/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const answer_constituent = sequelize.define('answer_constituent', {
    description: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  answer_constituent.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    answer_constituent.belongsTo(models.question_constituent, { foreignKey: 'questionId' });
  };

  return answer_constituent;
};
/* eslint-enable camelcase */
