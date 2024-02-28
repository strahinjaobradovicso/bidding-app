import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { EventResponse, EventStatus } from "../events/eventResponse";
import { bidStoreClient } from "../../bidding/service";
import { BidToClient } from "../../bidding/dtos/bidToClient";
import { AuctionBid } from "../../bidding/models/auctionBid";
import { BidToServer } from "../../bidding/dtos/bidToServer";
import dtoValidation from "../middlewares/dtoValidationMiddleware";
import { EventException } from "../exceptions/eventException";
import socketErrorHandler from "../exceptions/errorHandler";

export class AuctionHandler implements SocketHandler {

    handleConnection(socket: Socket<ToServerEvents, ToClientEvents>): void {
        socket.on('enterAuctionToServer', async (auctionId) => {
            try {
                await socket.join(`${auctionId}`)
                const auctionBid: AuctionBid = bidStoreClient.getBid(auctionId);
                const auctionBidDto: BidToClient = auctionBid.toDto(true);
                socket.emit('enterAuctionToClient', new EventResponse(EventStatus.Success), auctionId, auctionBidDto);
            } catch (error) {
                socketErrorHandler(socket, 'enterAuctionToClient', error);
            }
        })
        socket.on('placeBidToServer', async (data: BidToServer) => {
            try {

                const errors = await dtoValidation(BidToServer, data);

                if(errors){
                    throw new EventException(errors);
                }

                const newAskBid = bidStoreClient.placeBid(data.auctionId, Number(data.value));
                const newAskBidDto: BidToClient = newAskBid.toDto(false);

                socket
                .emit('placeBidToClient', new EventResponse(EventStatus.Success), data.auctionId, newAskBidDto);

                socket.to(data.auctionId)
                .emit('placeBidToClient', new EventResponse(EventStatus.Success), data.auctionId, newAskBidDto);

            } catch (error) {
                socketErrorHandler(socket, 'placeBidToClient', error);
            }
        })
    }

    middlewareImplementation(socket: Socket<ToServerEvents, ToClientEvents>, next: any): void {

        next();
    }

}