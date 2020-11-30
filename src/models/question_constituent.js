/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const question_constituent = sequelize.define('question_constituent', {
    content: DataTypes.TEXT,
    constituentId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  question_constituent.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.

    question_constituent.belongsTo(models.constituent, { foreignKey: 'authorId' });
    question_constituent.belongsTo(models.constituent);

    question_constituent.hasOne(models.answer_constituent, { foreignKey: 'questionId' });
  };

  return question_constituent;
};
/* eslint-enable camelcase */
