import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

      return res.status(200).json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const Users = await User.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'ativo'],
      });
      if (Users.length > 0) {
        return res.status(200).json(Users);
      }
      return res.status(200).json({ errors: 'Nenhum User cadastrado' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'ativo'],

      });
      if (!user) {
        return res.status(400).json({ errors: 'Nenhum User encontrado' });
      }
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ errors: 'User não encontrado' });
      }
      const userAtualizado = await user.update(req.body);
      return res.status(200).json(userAtualizado);
    } catch (e) {
      console.log('---ERROR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          [Op.and]: [{ id }, { ativo: true }],
        },
      });
      if (!user) {
        return res.status(400).json({ errors: 'User não encontrado ou desativado' });
      }

      user.ativo = 0;
      await user.save();
      return res.status(200).json({ errors: 'User excluído com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
