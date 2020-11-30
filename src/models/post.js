module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    content: DataTypes.TEXT,
    constituentId: DataTypes.INTEGER,
    checked: DataTypes.STRING,
  }, {});

  post.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    post.belongsTo(models.constituent);
    post.hasMany(models.comment);
    post.hasMany(models.comment_constituent);
  };

  return post;
};
