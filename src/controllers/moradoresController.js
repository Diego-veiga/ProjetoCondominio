import { Op } from 'sequelize';
import Moradores from '../models/Moradores';
import Apartamento from '../models/Apartamento';

class MoradoresController {
  async store(req, res) {
    try {
      const {
        nome, sobrenome, cpf, id_apartamento,
      } = req.body;
      const apartamento = await Apartamento.findOne({
        where: {
          [Op.and]: [
            { id: id_apartamento },
            { ativo: true },
          ],
        },
      });
      if (!apartamento) {
        return res
          .status(400)
          .json({ message: 'apartamento não encontrado ou inativo' });
      }
      const cpfpossuiPonto = cpf.indexOf('.');

      if (!cpfpossuiPonto) {
        return res
          .status(400)
          .json({ message: 'digite o cpf sem os pontos e traços' });
      }

      const novoMorador = await Moradores.create({
        nome,
        sobrenome,
        cpf,
        id_apartamento,
      });
      return res.status(200).json({ novoMorador });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const moradores = await Moradores.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'cpf'],
      });
      if (moradores.length <= 0) {
        return res
          .status(400)
          .json({ Message: 'nenhum morador encontrado' });
      }
      return res.status(200).json(moradores);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Id é necessário' });
      }
      const morador = await Moradores.findByPk(id, { attributes: ['id', 'nome', 'sobrenome', 'cpf'] });
      if (!morador) {
        return res.status(400).json({ message: 'Morador não encontrado' });
      }
      return res.status(200).json(morador);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Id é necessário' });
      }
      const morador = await Moradores.findByPk(id);
      if (!morador) {
        return res.status(400).json({ message: 'Morador não encontrado' });
      }
      morador.update(req.body);
      return res.status(200).json({ message: 'Morador atualizado com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Id é necessário' });
      }
      const morador = await Moradores.findOne({
        where: {
          id,
          ativo: true,
        },
      });
      if (!morador) {
        return res.status(400).json({ message: 'Morador não encontrado ou inativo' });
      }
      morador.ativo = false;
      await morador.save();
      return res.status(200).json({ message: 'Morador inativado com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async moradorApartamento(req, res) {
    try {
      const { id_apartamento } = req.params;

      if (!id_apartamento) return res.status(400).json({ errors: 'Id do apartamento não enviado' });

      const moradores = await Moradores.findAll({
        where: {
          [Op.and]: [{ id_apartamento }, { ativo: true }],
        },
      });

      if (!moradores) return res.status(400).josn({ errors: 'Não existem moradores para este aparatamento' });
      return res.status(200).json(moradores);
    } catch (e) {
      console.log('----ERROR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new MoradoresController();
