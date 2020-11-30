/* eslint no-unused-vars : "off" */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('constituent_follows', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    constituentFollowerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { // Answer belongsTo Question 1:1
        model: 'constituents',
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
    constituentFollowingId: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('constituent_follows'),

};
