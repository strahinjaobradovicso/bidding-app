import { Socket } from "socket.io";

export interface SocketHandler {
    handleConnection(socket: Socket): void;
    middlewareImplementation(socket: Socket, next:any): void;
}