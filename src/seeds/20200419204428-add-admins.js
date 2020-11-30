const bcrypt = require('bcrypt');

const PASSWORD_SALT = 10;

module.exports = {
  up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const adminsData = [
      {
        name: 'Andres Pincheira',
        email: 'apincheira@uc.cl',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('admins', adminsData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('admins', null, {}),
};
