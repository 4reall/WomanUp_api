import 'reflect-metadata';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import cors from 'cors';

import { EnvConfig } from './envConfig';
import authRoute from './modules/auth/auth.route';
import { globalExceptionMiddleware } from './middlewares/global-exception.middleware';
import todoRouter from './modules/todo/todo.route';

const app: Express = express();
const PORT = EnvConfig.PORT || 5500;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['POST', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.options('*', cors());
app.use('/', authRoute);
app.use('/todos', todoRouter);

app.use(globalExceptionMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(EnvConfig.DB_URL);
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
