import express from 'express';
import helmet from 'helmet';
import { NODE_ENV, PORT } from './config';
import bodyParser from 'body-parser';
import errorMiddleware from './middlewares/errorMiddleware';
import { Routes } from './routes/interfaces/route';

class Server {
    app: express.Application;
    port: string | number;
    env: string;

    constructor(routes: Routes[]){
        this.app = express();
        this.port = PORT || 3000;
        this.env = NODE_ENV || 'dev' 

        this.enableCors()
        this.initMiddlewares()
        this.initRoutes(routes)
        this.initErrorMiddleware()
    }

    private enableCors(){
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*'); 
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            next();
        })
    }

    private initMiddlewares(){
        this.app.use(helmet())
        this.app.use(bodyParser.json())
    }

    private initRoutes(routes: Routes[]){
        for (const route of routes) {
            this.app.use('/', route.router);
        }
    }

    public initErrorMiddleware(){
        this.app.use(errorMiddleware)
    }

}

export default Server;
