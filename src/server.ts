import express from 'express';
import helmet from 'helmet';
import { NODE_ENV, PORT } from './config';
import bodyParser from 'body-parser';
import errorMiddleware from './middlewares/errorMiddleware';
import DB from './database';

class Server {
    app: express.Application;
    port: string | number;
    env: string;

    constructor(){
        this.app = express();
        this.port = PORT || 3000;
        this.env = NODE_ENV || 'dev' 

        this.initMiddlewares()
        this.initRoutes()
        this.initErrorMiddleware()
    }


    private initMiddlewares(){
        this.app.use(helmet())
        this.app.use(bodyParser.json())
    }

    private initRoutes(){
        
    }

    public initErrorMiddleware(){
        this.app.use(errorMiddleware)
    }

    public async start(){   
        try {
            await DB.connect()
            this.app.listen(this.port)
        } catch (error) {
            console.log(error)
        }
    }
}

export default Server;
