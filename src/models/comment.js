module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    authorCommentId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  comment.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    comment.belongsTo(models.post);
    comment.belongsTo(models.voter, { foreignKey: 'authorCommentId' });
  };

  return comment;
};
