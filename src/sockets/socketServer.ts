import { Server, Socket } from "socket.io";
import { SocketChannel } from "./multiplexing/socketChannel";

const SOCKET_CORS = {
    origin: '*'
}

export class SocketServer extends Server {

    private static io: SocketServer;
    
    constructor(http: any){
        super(http, {
            cors: SOCKET_CORS
        })
    }
    public static getInstance(httpServer?: any): SocketServer {
        if(!SocketServer.io){
            SocketServer.io = new SocketServer(httpServer);
        }
        return SocketServer.io;
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