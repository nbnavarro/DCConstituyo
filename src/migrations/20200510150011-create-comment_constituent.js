module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comment_constituents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    content: {
      type: Sequelize.TEXT,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    authorCommentId: {
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

  down: (queryInterface) => queryInterface.dropTable('comment_constituents'),
};
