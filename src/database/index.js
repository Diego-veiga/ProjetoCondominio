import Sequelize from 'sequelize';
import ConfigDatabase from '../config/database';
import Bloco from '../models/Bloco';
import Apartamento from '../models/Apartamento';
import Moradores from '../models/Moradores';
import User from '../models/User';

const models = [User, Bloco, Apartamento, Moradores];

const connection = new Sequelize(ConfigDatabase);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
