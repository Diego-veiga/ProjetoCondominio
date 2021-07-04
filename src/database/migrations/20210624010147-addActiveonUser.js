module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'blocos',
      'ativo',
      {
        type: Sequelize.DataTypes.BOOLEAN,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('blocos', 'ativo');
  },
};
