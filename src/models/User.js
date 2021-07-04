import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'O campo nome deve conter entre 3 e 50 caracteres',
            },
          },
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
              msg: 'O campo sobrenome deve conter entre 3 e 50 caracteres',
            },
          },
          notEmpty: {
            msg: 'O campo sobrenome não pode estar vazio',
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'O campo sobrenome deve conter entre 3 e 50 caracteres',
            },
            isEmail: {
              msg: 'Email inválido',
            },
          },
          unique: {
            msg: 'Email ja cadastrado',
          },
        },
        ativo: {
          type: Sequelize.BOOLEAN,
          defaultValue: 1,
        },
        password_hash: Sequelize.STRING,

        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
      }, {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  async passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
