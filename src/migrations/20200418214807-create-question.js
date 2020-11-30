module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    content: {
      type: Sequelize.TEXT,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    constituentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'constituents',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'voters',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    checked: {
      type: Sequelize.STRING,
      defaultValue: 'no',
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('questions'),
};
