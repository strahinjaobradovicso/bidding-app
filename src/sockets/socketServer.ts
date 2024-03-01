import { Server, Socket } from "socket.io";
import { SocketChannel } from "./multiplexing/socketChannel";
import { authMiddleware } from "../middlewares/authMiddleware";
import { NextFunction, Request, Response } from "express";

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

    public initializeMiddlewares(){
        this.engine.use(authMiddleware());
    }

    public initializeHandlers(socketHandlers: Array<SocketChannel>) {
        socketHandlers.forEach(element => {
            const namespace = SocketServer.io.of(element.path, (socket: Socket) => {
                element.handler.handleConnection(socket);
            })
            namespace.use(element.handler.middlewareImplementation)
        });
    }
}