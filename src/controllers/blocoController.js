import { Op } from 'sequelize';
import Bloco from '../models/Bloco';
import Apartamento from '../models/Apartamento';

class BlocoController {
  async store(req, res) {
    try {
      const newBLoco = await Bloco.create(req.body);
      return res.status(200).json(newBLoco);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const blocos = await Bloco.findAll({
        attributes: ['id', 'numero', 'ativo'],
        include: {
          model: Apartamento,
          attributes: ['id', 'numero', 'metro_quadrado', 'numero_comodos', 'ativo'],
        },

      });
      if (blocos.length > 0) {
        return res.status(200).json(blocos);
      }
      return res.status(200).json({ errors: 'Nenhum bloco cadastrado' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const bloco = await Bloco.findByPk(id, {
        attributes: ['id', 'numero', 'ativo'],
        include: {
          model: Apartamento,
          attributes: ['id', 'numero', 'metro_quadrado', 'numero_comodos', 'ativo'],
        },
      });
      if (!bloco) {
        return res.status(400).json({ errors: 'Nenhum bloco encontrado' });
      }
      return res.status(200).json(bloco);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const bloco = await Bloco.findByPk(id);
      if (!bloco) {
        return res.status(400).json({ errorr: 'Bloco não encontrado' });
      }
      const blocoAtualizado = await bloco.update(req.body);
      return res.status(200).json(blocoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const bloco = await Bloco.findOne({
        where: {
          [Op.and]: [{ id }, { ativo: true }],
        },
      });
      if (!bloco) {
        return res.status(400).json({ errors: 'Bloco não encontrado ou desativado' });
      }
      const apartamento = await Apartamento.findAll({
        where: {
          [Op.and]: [{ bloco_id: id }, { ativo: true }],
        },
      });
      if (apartamento.length) {
        return res.status(400).json({ errors: 'Este bloco não pode ser desativado pois existem apartamentos vinculados ao mesmo' });
      }
      bloco.ativo = 0;
      await bloco.save();
      return res.status(200).json({ errors: 'Bloco excluído com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new BlocoController();
