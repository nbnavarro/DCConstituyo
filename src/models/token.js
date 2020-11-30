const bcrypt = require('bcrypt');

const PASSWORD_SALT = 10;

async function buildPasswordHash(instance) {
  if (instance.changed('content')) {
    const hash = await bcrypt.hash(instance.content, PASSWORD_SALT);
    instance.set('content', hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    idUser: DataTypes.INTEGER,
    content: DataTypes.STRING,
    userType: DataTypes.STRING,
  }, {});

  token.beforeCreate(buildPasswordHash);
  token.beforeUpdate(buildPasswordHash);

  token.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  token.prototype.checkContent = function checkContent(content) {
    return bcrypt.compare(content, this.content);
  };

  return token;
};
