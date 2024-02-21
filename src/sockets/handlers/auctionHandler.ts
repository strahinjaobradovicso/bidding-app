import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { EventResponse, EventStatus } from "../events/eventResponse";
import { bidStoreClient } from "../../bidding/service";
import { AuctionBidDto } from "../../bidding/dtos/auctionBidDto";
import { AuctionBid } from "../../bidding/models/auctionBid";

export class AuctionHandler implements SocketHandler {

    handleConnection(socket: Socket<ToServerEvents, ToClientEvents>): void {
        socket.on('enterAuctionToServer', async (auctionId) => {
            try {
                await socket.join(`${auctionId}`)
                const auctionBid: AuctionBid = bidStoreClient.getBid(auctionId);
                const auctionBidDto: AuctionBidDto = auctionBid.toDto(true);
                socket.emit('enterAuctionToClient', auctionId, auctionBidDto, new EventResponse(EventStatus.Success));
            } catch (error) {
                socket.emit('enterAuctionToClient', auctionId, undefined, new EventResponse(EventStatus.Failure));
            }
        })
        socket.on('placeBidToServer', async (auctionId, value) => {
            try {
                const newAskBid = bidStoreClient.placeBid(auctionId, Number(value));
                const newAskBidDto: AuctionBidDto = newAskBid.toDto(false);

                socket
                .emit('placeBidToClient', auctionId, newAskBidDto, new EventResponse(EventStatus.Success));

                socket.to(`${auctionId}`)
                .emit('placeBidToClient', auctionId, newAskBidDto, new EventResponse(EventStatus.Success));

            } catch (error) {
                socket.emit('placeBidToClient', auctionId, undefined, new EventResponse(EventStatus.Failure));
            }
        })
    }

    middlewareImplementation(socket: Socket, next: any): void {
        next();
    }

}