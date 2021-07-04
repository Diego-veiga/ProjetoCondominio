module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('apartamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      metro_quadrado: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      numero_comodos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bloco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blocos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('apartamentos');
  },
};
