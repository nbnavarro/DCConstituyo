module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('answer_constituents', {
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
    questionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { // Answer belongsTo Question 1:1
        model: 'question_constituents',
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

  down: (queryInterface) => queryInterface.dropTable('answer_constituents'),
};
