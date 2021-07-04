import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ errros: 'Usuário e senha são obrigatórios para login ' });
      }
      const user = await User.findOne({
        where: {
          [Op.and]: [
            { email },
            { ativo: true },
          ],
        },
      });
      if (!user) {
        return res.status(400).json({ errors: 'Usuário ou senha inválidos' });
      }
      if (!(await user.passwordIsValid(password))) {
        return res.status(400).json({ errors: 'Usuário ou senha inválidos' });
      }
      const { id } = user;
      const token = await jwt.sign({ id, email }, process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION });
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map((err) => err.message),
      });
    }
  }
}

export default new TokenController();
