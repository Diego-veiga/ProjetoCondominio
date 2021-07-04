import Sequelize, { Model } from 'sequelize';

export default class Bloco extends Model {
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

  static associate(models) {
    this.hasMany(models.Apartamento, { foreignKey: 'bloco_id' });
  }
}
