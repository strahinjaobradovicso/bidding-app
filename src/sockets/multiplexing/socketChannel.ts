import { SocketHandler } from "./socketHandler";

export interface SocketChannel {
    path: string,
    handler: SocketHandler
}