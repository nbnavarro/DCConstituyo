const bcrypt = require('bcrypt');

const PASSWORD_SALT = 10;

async function buildPasswordHash(instance) {
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.password, PASSWORD_SALT);
    instance.set('password', hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const constituent = sequelize.define('constituent', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    description: DataTypes.TEXT, // resumen tematico
    resume: DataTypes.TEXT, // curriculum
    password: DataTypes.STRING,
  }, {});

  constituent.beforeCreate(buildPasswordHash);
  constituent.beforeUpdate(buildPasswordHash);

  constituent.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    constituent.hasMany(models.post);
    constituent.hasMany(models.question);
    constituent.hasMany(models.question_constituent, { foreignKey: 'authorId' });
    constituent.belongsToMany(models.voter, { through: 'follows' });

    constituent.belongsToMany(models.constituent, {
      through: 'constituent_follows',
      as: 'Follower',
      foreignKey: 'constituentFollowingId',
      otherKey: 'constituentFollowerId',
    });

    constituent.belongsToMany(models.constituent, {
      through: 'constituent_follows',
      as: 'Following',
      foreignKey: 'constituentFollowerId',
      otherKey: 'constituentFollowingId',
    });

    constituent.belongsToMany(models.stance, { through: 'constituent_stance' });
    constituent.hasMany(models.comment_constituent, { foreignKey: 'authorCommentId' });

    // constituent.hasMany(models.comment);
  };

  constituent.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return constituent;
};
