module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'moradores',
      'ativo',
      {
        type: Sequelize.DataTypes.BOOLEAN,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('moradores', 'ativo');
  },
};
