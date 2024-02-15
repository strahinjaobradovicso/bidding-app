import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";

interface AuctionToServerEvents {
}

interface AuctionToClientEvents {
}

export class AuctionHandler implements SocketHandler {

    handleConnection(socket: Socket<AuctionToServerEvents, AuctionToClientEvents>): void {
        
    }

    middlewareImplementation(socket: Socket, next: any): void {
        next();
    }

}