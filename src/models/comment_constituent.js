/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const comment_constituent = sequelize.define('comment_constituent', {
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    authorCommentId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  comment_constituent.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    comment_constituent.belongsTo(models.post);
    comment_constituent.belongsTo(models.constituent, { foreignKey: 'authorCommentId' });
  };

  return comment_constituent;
};
/* eslint-enable camelcase */
