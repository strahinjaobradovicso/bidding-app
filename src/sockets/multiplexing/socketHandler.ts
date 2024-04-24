import { Socket } from "socket.io";

export interface SocketHandler {
    path: string,
    handleConnection(socket: Socket): void;
}