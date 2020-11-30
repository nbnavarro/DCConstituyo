/* eslint no-unused-vars : "off" */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('constituent_stance', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
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
    stanceId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'stances',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('constituent_stance'),

};
