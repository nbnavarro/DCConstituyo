module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
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
        model: 'voters',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    userType: {
      type: Sequelize.TEXT,
    },

    checked: {
      type: Sequelize.STRING,
      defaultValue: 'no',
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('comments'),
};
