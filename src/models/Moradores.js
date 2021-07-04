import Sequelize, { Model } from 'sequelize';

export default class Moradores extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'O campo nome deve ter entre 3 e 50 caracteres ',
          },
        },
        allowNull: false,
        notEmpty: {
          msg: 'O campo nome não pode estar vazio',
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'O campo sobrenome deve ter entre 3 e 50 caracteres ',
          },
        },
        allowNull: false,
        notEmpty: {
          msg: 'O sobrenome nome não pode estar vazio',
        },
      },
      cpf: {
        type: Sequelize.STRING,
        unique: {
          msg: 'cpf ja cadastrado',
        },
        notEmpty: {
          msg: 'cpf não pode ficar vazio',
        },
        validate: {
          len: {
            args: [11, 11],
            msg: 'O campo cpf deve conter 11 caracteres',
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
  }

  static associate(models) {
    this.belongsTo(models.Apartamento, { foreignKey: 'id_apartamento' });
  }
}
