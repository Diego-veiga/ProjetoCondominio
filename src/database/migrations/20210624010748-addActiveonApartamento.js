module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'apartamentos',
      'ativo',
      {
        type: Sequelize.DataTypes.BOOLEAN,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('apartamentos', 'ativo');
  },
};
