/* eslint-disable no-underscore-dangle */
import morgan from 'morgan';
import express, { Application } from 'express';
import http2Express from 'http2-express-bridge';
import cors from 'cors';
import middlewares from './middlewares';
import router from './route';

class App {
  app!: Application;
  constructor() {
    this.init();
  }
  private init() {
    this.app = http2Express(express);
    this.middlewares();
    this.initRoutes();
  }
  private middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initRoutes() {
    this.app.use('/split-payments/compute', router);
    this.app.use('*', middlewares.error404);
    this.app.use(middlewares.errorHandler);
  }
  server() {
    return this.app;
  }
}

export default new App();
