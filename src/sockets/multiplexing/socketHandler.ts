import { Socket } from "socket.io";
import { SocketServer } from "../socketServer";

export interface SocketHandler {
    path: string,
    handleConnection(socket: Socket): void;
    middlewareImplementation(socket: Socket, next:any): void;
}