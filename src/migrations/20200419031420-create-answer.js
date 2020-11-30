module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('answers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    description: {
      type: Sequelize.TEXT,
    },
    authorId: {
      type: Sequelize.INTEGER,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    questionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { // Answer belongsTo Question 1:1
        model: 'questions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    checked: {
      type: Sequelize.STRING,
      defaultValue: 'no',
    },


  }),

  down: (queryInterface) => queryInterface.dropTable('answers'),
};
