import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ errors: 'token inválido' });
    }

    const [, token] = authorization.split(' ');

    const dados = await jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        [Op.and]: [
          { id },
          { email },
          { ativo: true },
        ],
      },
    });
    if (!user) {
      return res.status(400).json({ errors: 'Usuario e senha inválidos' });
    }
    req.userEmail = email;
    req.userId = id;
    next();
  } catch (e) {
    return res.status(400).json({ error: 'Token inválido' });
  }
};
