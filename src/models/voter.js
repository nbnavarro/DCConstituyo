const bcrypt = require('bcrypt');

const PASSWORD_SALT = 10;

async function buildPasswordHash(instance) {
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.password, PASSWORD_SALT);
    instance.set('password', hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const voter = sequelize.define('voter', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  voter.beforeCreate(buildPasswordHash);
  voter.beforeUpdate(buildPasswordHash);

  voter.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    voter.belongsToMany(models.constituent, { through: 'follows' });
    voter.belongsToMany(models.topic, { through: 'interests' });
    voter.hasMany(models.question, { foreignKey: 'authorId' });
    voter.hasMany(models.comment, { foreignKey: 'authorCommentId' });
  };

  voter.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return voter;
};
