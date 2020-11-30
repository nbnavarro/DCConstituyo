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
    const votersData = [
      {
        name: 'Juana Perez',
        age: 19,
        email: 'juana@aliquet.cl',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gavin English',
        age: 59,
        email: 'nisi.Mauris.nulla@lacinia.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amanda Cepeda',
        age: 65,
        email: 'amanda@euismodet.cl',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Francisco Livingston',
        age: 59,
        email: 'taciti@diam.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juana Johnston',
        age: 53,
        email: 'faucibus.id@purussapien.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alejandra Castro',
        age: 18,
        email: 'ale.est@nonenim.net',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maria Galvez',
        age: 60,
        email: 'tortor.nibh@dolor.ca',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Constanza Patton',
        age: 38,
        email: 'patton@nisl.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Helena Watson',
        age: 19,
        email: 'Cras@sem.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Miguel Kline',
        age: 57,
        email: 'mkline@Donecluctus.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Julia Lindsay',
        age: 51,
        email: 'julindsay@pulvinararcu.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rebeca Rivera',
        age: 60,
        email: 'massa.Suspendisse.eleifend@elit.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Linus Frederick',
        age: 46,
        email: 'ante@nostra.cl',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Naomi Nixon',
        age: 59,
        email: 'adipiscing@sagittislobortismauris.net',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Esperanza Hart',
        age: 18,
        email: 'sem@sem.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Shelby Meyer',
        age: 39,
        email: 'euismod.mauris@quamelementum.org',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Daniel Dillard',
        age: 47,
        email: 'enim.Nunc@penatibus.ca',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juan Terry',
        age: 40,
        email: 'tellus.Suspendisse@lacus.co',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Javier Mcdowell',
        age: 22,
        email: 'blandit@egetmetusIn.net',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('voters', votersData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('voters', null, {}),
};
