import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { EventResponse, EventStatus } from "../events/eventResponse";
import { bidStoreClient } from "../../bidding/service";
import { BidToClient } from "../../bidding/dtos/bidToClient";
import { AuctionBid } from "../../bidding/models/auctionBid";
import { BidToServer } from "../../bidding/dtos/bidToServer";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";

export class AuctionHandler implements SocketHandler {

    handleConnection(socket: Socket<ToServerEvents, ToClientEvents>): void {
        socket.on('enterAuctionToServer', async (auctionId) => {
            try {
                await socket.join(`${auctionId}`)
                const auctionBid: AuctionBid = bidStoreClient.getBid(auctionId);
                const auctionBidDto: BidToClient = auctionBid.toDto(true);
                socket.emit('enterAuctionToClient', auctionId, auctionBidDto, new EventResponse(EventStatus.Success));
            } catch (error) {
                socket.emit('enterAuctionToClient', auctionId, undefined, new EventResponse(EventStatus.Failure));
            }
        })
        socket.on('placeBidToServer', async (data: BidToServer) => {
            try {
                const newAskBid = bidStoreClient.placeBid(data.auctionId, Number(data.value));
                const newAskBidDto: BidToClient = newAskBid.toDto(false);

                socket
                .emit('placeBidToClient', data.auctionId, newAskBidDto, new EventResponse(EventStatus.Success));

                socket.to(data.auctionId)
                .emit('placeBidToClient', data.auctionId, newAskBidDto, new EventResponse(EventStatus.Success));

            } catch (error) {
                socket.emit('placeBidToClient', data.auctionId, undefined, new EventResponse(EventStatus.Failure));
            }
        })
    }

    middlewareImplementation(socket: Socket<ToServerEvents, ToClientEvents>, next: any): void {

        socket.on('placeBidToServer', (bid) => {
            const validator = dtoValidationMiddleware(BidToServer, bid);
            validator(next);
        });


        next();
        
    }

}