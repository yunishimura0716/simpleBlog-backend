import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { Route } from './constant/Route';
import { UserRouter } from './route/UserRouter';
import { errorHandler } from './errorHandler/ErrorHandler';

export class App {
  async init(): Promise<void> {
    try {
      const app: Express = express();
      await mongoose.connect(
        `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      // If there is a connection error send an error message
      mongoose.connection.on('error', (error) => {
        console.log('Database connection error:', error);
      });
      // If connected to MongoDB send a success message
      mongoose.connection.once('open', () => {
        console.log('Connected to Database!');
      });

      mongoose.Promise = global.Promise;

      await this.registerHandlersAndRoutes(app);

      const port = 3000;
      app.listen(port, () => {
        console.log('server start');
      });
    } catch (error) {
      console.log(error);
    }
  }

  async registerHandlersAndRoutes(app: Express): Promise<void> {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.get('/', (req: Request, res: Response) => {
      const data = { message: 'Hello World' };
      res.send(data);
    });

    const userRouter = new UserRouter();
    app.use(Route.USERS, userRouter.getRoutes());

    // middleware needs to be added at end
    app.use(errorHandler);
  }
}
