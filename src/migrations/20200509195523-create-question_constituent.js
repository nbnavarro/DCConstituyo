module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('question_constituents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    content: {
      type: Sequelize.TEXT,
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
        model: 'constituents',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    checked: {
      type: Sequelize.STRING,
      defaultValue: 'no',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('question_constituents'),
};
