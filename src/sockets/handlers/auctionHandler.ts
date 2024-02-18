import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { auctionService } from "../../services/AuctionService";
import { AuctionModel } from "../../database/models/auction";

export class AuctionHandler implements SocketHandler {

    handleConnection(socket: Socket<ToServerEvents, ToClientEvents>): void {
        socket.on('enterAuctionToServer', async (auctionId: number) => {
            const auction: AuctionModel = await auctionService.findAuctionById(auctionId);
        })
    }

    middlewareImplementation(socket: Socket, next: any): void {
        next();
    }

}