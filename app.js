import express from 'express';
import dotenv from 'dotenv';
import './src/database';
import blocoRouter from './src/router/blocoRouter';
import apartamentoRouter from './src/router/apartamentoRouter';
import noradoresRouter from './src/router/moradoresRouter';
import userRouter from './src/router/userRouter';
import tokenRouter from './src/router/tokenRouter';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  router() {
    this.app.use('/bloco/', blocoRouter);
    this.app.use('/apartamento/', apartamentoRouter);
    this.app.use('/morador/', noradoresRouter);
    this.app.use('/user/', userRouter);
    this.app.use('/token/', tokenRouter);
  }
}

export default new App().app;
