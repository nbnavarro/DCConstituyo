module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('stances', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      type: Sequelize.STRING,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    topicId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'topics',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('stances'),
};
