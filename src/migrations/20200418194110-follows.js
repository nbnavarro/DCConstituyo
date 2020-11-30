/* eslint no-unused-vars : "off" */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('follows', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    voterId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { // Answer belongsTo Question 1:1
        model: 'voters',
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
    constituentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'constituents',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('follows'),

};
