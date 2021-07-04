import { Op } from 'sequelize';
import Apartamento from '../models/Apartamento';
import Bloco from '../models/Bloco';
import Moradores from '../models/Moradores';

class ApartamentoController {
  async store(req, res) {
    try {
      const {
        numero, metro_quadrado, numero_comodos, bloco_id,
      } = req.body;
      const bloco = await Bloco.findByPk(bloco_id);
      if (!bloco) {
        return res.status(400).json({ errors: 'bloco não encontrado' });
      }
      if (bloco.ativo === false) return res.status(400).json({ errors: 'Bloco  Inativo' });
      const apartamentoExiste = await Apartamento.findOne({ where: { numero, bloco_id } });

      if (apartamentoExiste) return res.status(400).json({ errors: 'Apartamento ja cadastrado' });

      const newApartamento = await Apartamento.create({
        numero, metro_quadrado, numero_comodos, bloco_id,
      });

      return res.status(200).json(newApartamento);
    } catch (e) {
      console.log('ERRROR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const Apartamentos = await Apartamento.findAll({
        attributes: ['id', 'numero', 'metro_quadrado', 'numero_comodos', 'ativo'],
        include: {
          model: Bloco,
          attributes: ['numero'],
        },
      });

      if (Apartamentos.length > 0) {
        return res.status(200).json(Apartamentos);
      }
      return res.status(200).json({ Message: 'Nenhum Apartamento cadastrado' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const apartamento = await Apartamento.findByPk(id,
        {
          attributes: ['id', 'numero', 'metro_quadrado', 'numero_comodos', 'ativo'],
          include: {
            model: Bloco,
            attributes: ['numero'],
          },
        });
      if (!apartamento) {
        return res.status(400).json({ Message: 'Nenhum Apartamento encontrado' });
      }

      return res.status(200).json(apartamento);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const apartamento = await Apartamento.findByPk(id);
      if (!apartamento) {
        return res.status(400).json({ message: 'Apartamento não encontrado' });
      }
      const { bloco_id } = req.body;
      if (bloco_id) {
        const bloco = await Bloco.findByPk(bloco_id);
        if (!bloco) {
          return res.status(400).json({ errors: 'BLoco informado não existe' });
        }
      }
      const apartamentoAtualizado = await apartamento.update(req.body);
      return res.status(200).json(apartamentoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const apartamento = await Apartamento.findOne({
        where: {
          [Op.and]: [{ id }, { ativo: true }],
        },
      });

      const ExisteMoradores = await Moradores.findOne({
        where: {
          [Op.and]:
             [
               { id_aparatamento: id },
               { ativo: true },
             ],
        },
      });
      if (ExisteMoradores) return res.status(400).json({ errors: 'Este apartamento não pode ser excluído pois existem moradores ativos' });

      if (!apartamento) {
        return res.status(400).json({ message: 'Apartamento não encontrado ou ja inativo' });
      }
      apartamento.ativo = 0;
      await apartamento.save();
      return res.status(200).json({ message: 'Apartamento excluído com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ApartamentoController();
