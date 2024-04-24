import { Socket } from "socket.io";
import { SocketHandler } from "../multiplexing/socketHandler";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { BidToClient } from "../../bidding/dtos/bidToClient";
import { AuctionBid } from "../../bidding/models/auctionBid";
import { BidToServer } from "../../bidding/dtos/bidToServer";
import dtoValidation from "../util/dtoValidation";
import { TokenRequest } from "../../ambient/request";
import { BidStoreClient } from "../../bidding/service";

export class AuctionHandler implements SocketHandler {

    public path = '/auctions'
    private bidStoreClient: BidStoreClient;
    
    constructor(bidStoreClient: BidStoreClient){
        this.bidStoreClient = bidStoreClient;
    }    

    handleConnection(socket: Socket<ToServerEvents, ToClientEvents>): void {

        socket.on('enterAuction', async (auctionId) => {
        console.log('on enter auction')

            try {
                await socket.join(auctionId)
                const auctionBid: AuctionBid = this.bidStoreClient.getBid(auctionId);
                const auctionBidDto: BidToClient = auctionBid.toDto();
                socket.emit('bidAccept', auctionBidDto);
                console.log(auctionBid)
            } catch (error: unknown) {
                socket.emit('auctionReject', 'could not enter an auction');
            }
        })
        socket.on('placeBid', async (data: BidToServer) => {
            try {

                const errors = await dtoValidation(BidToServer, data);

                if(errors){
                    throw new Error(errors);
                }
                const token = (socket.request as TokenRequest).token;

                const newAskBid = this.bidStoreClient.placeBid({
                    id: token.userId,
                    username: token.username
                }, data);
                
                const placedBid: BidToClient = newAskBid.toDto();

                socket
                .emit('bidAccept', placedBid);

                socket.to(data.auctionId)
                .emit('bidAccept', placedBid);

            } catch (error: unknown) {
                socket.emit('bidReject', 'could not place a bid');
            }
        })
    }

}