import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { EventResponse, EventStatus } from "../events/eventResponse";
import { bidStoreClient } from "../../bidding/service";

export class AuctionHandler implements SocketHandler {

    handleConnection(socket: Socket<ToServerEvents, ToClientEvents>): void {
        socket.on('enterAuctionToServer', async (auctionId) => {
            try {
                await socket.join(`${auctionId}`)
                const auctionBid = bidStoreClient.getBid(auctionId);
                socket.emit('enterAuctionToClient', auctionBid, new EventResponse(EventStatus.Success));
            } catch (error) {
                socket.emit('enterAuctionToClient', undefined, new EventResponse(EventStatus.Failure));
            }
        })
        socket.on('placeBidToServer', async (auctionId, value) => {
            try {
                const newAskBid = bidStoreClient.placeBid(auctionId, Number(value));

                socket
                .emit('placeBidToClient', auctionId, newAskBid, new EventResponse(EventStatus.Success));

                socket.to(`${auctionId}`)
                .emit('placeBidToClient', auctionId, newAskBid, new EventResponse(EventStatus.Success));

            } catch (error) {
                socket.emit('placeBidToClient', auctionId, undefined, new EventResponse(EventStatus.Failure));
            }
        })
    }

    middlewareImplementation(socket: Socket, next: any): void {
        next();
    }

}