module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    content: DataTypes.TEXT,
    constituentId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  question.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    question.belongsTo(models.voter, { foreignKey: 'authorId' });
    question.belongsTo(models.constituent);

    question.hasOne(models.answer);
  };

  return question;
};
