'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        foreignKey: true,
        // references: {
        //   model: 'PostCategories',
        //   key: 'postId',
        // },
      },
      name: {
        type: Sequelize.STRING
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};
