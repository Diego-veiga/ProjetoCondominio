import Sequelize, { Model } from 'sequelize';

export default class Apartamento extends Model {
  static init(sequelize) {
    super.init({
      numero: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          customValidator(value) {
            if (value <= 0) {
              throw new Error('O numero do bloco deve ser maior que 0');
            }
          },
        },
      },
      metro_quadrado: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: {
          msg: 'É necessario informar metragem do apartamento',
        },
        validate: {
          isFloat: {
            msg: 'Metro quadrado precisa ser do tipo float',
          },
        },
      },
      numero_comodos: {
        type: Sequelize.INTEGER,
        allowNull: {
          msg: 'É necessario informar metragem do apartamento',
        },
        validate: {
          isFloat: {
            msg: 'Metro quadrado precisa ser do tipo float',
          },
        },
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,

      },

    },
    {
      sequelize,
    });
    return this;
  }

  static associate(model) {
    this.belongsTo(model.Bloco, { foreignKey: 'bloco_id' });
    this.hasMany(model.Moradores, { foreignKey: 'id_apartamento' });
  }
}
