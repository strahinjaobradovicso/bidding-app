import { Server, Socket } from "socket.io";
import { authMiddleware } from "../middlewares/authMiddleware";
import { SocketHandler } from "./multiplexing/socketHandler";

const SOCKET_CORS = {
    origin: '*'
}

export class SocketServer extends Server {

    private static io: SocketServer;
    
    constructor(http: any){
        super(http, {
            cors: SOCKET_CORS
        })
        this.initializeMiddlewares()
    }
    public static getInstance(httpServer?: any): SocketServer {
        if(!SocketServer.io){
            SocketServer.io = new SocketServer(httpServer);
        }
        return SocketServer.io;
    }

    private initializeMiddlewares(){
        this.engine.use((req:any,res:any,next:any)=>{
            if (req._query.sid === undefined) {
                authMiddleware()(req,res,next);
            }
            else{
                next();
            } 
        })
    }

    public initializeHandlers(socketHandlers: Array<SocketHandler>) {
        socketHandlers.forEach(element => {
            const namespace = SocketServer.io.of(element.path, (socket: Socket) => {
                element.handleConnection(socket);
            })
        });
    }
}