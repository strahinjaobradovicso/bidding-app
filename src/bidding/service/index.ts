import { SocketServer } from "../../sockets/socketServer";
import { BidToServer } from "../dtos/bidToServer";
import { AuctionBid } from "../models/auctionBid";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";
import DB from "../../database";
import { Bidder } from "../interfaces/bidder";
import { AuctionStatus } from "../../database/models/auction";
import { Socket } from "socket.io";
import { ToClientEvents, ToServerEvents } from "../../sockets/events/auctionEvents";

export class BidStoreClient {

    private bids = new Map<string, AuctionBid>;
    declare socket: Socket<ToServerEvents, ToClientEvents>;

    private io: SocketServer;

    constructor(io: SocketServer){
        this.io = io;
    }

    setBid(key: string, bid: AuctionBid) {
        this.bids.set(key, bid);
    }

    getBid(key: string) {
        const auctionBid = this.bids.get(key);
        if(!auctionBid){
            throw new Error('auction is not active');
        }
        return auctionBid;
    }

    placeBid(bidder: Bidder, bid: BidToServer) {
        const key = bid.auctionId;
        const value = bid.value;
        const auctionBid = this.getBid(key);
        auctionBid.askValue = value;
        auctionBid.bidder = bidder;
        DB.Bid.create({
            auctionId: Number(key),
            userId: bidder.id,
            value: value
        }).catch(err=>{
            console.log(err);
        });
        
        return auctionBid;
    }

    clearAuctions() {
        for(const [key, bid] of this.bids){
            bid.isFinal = true;
            this.io.of('/auctions').to(key).emit('bidAccept', bid.toDto());
            DB.Auction.findByPk(key)
            .then(auction => {
                if(auction){
                    auction.status = AuctionStatus.Done;
                    auction.winnerId = bid.bidder?bid.bidder.id:undefined;
                    auction.lastBid = bid.reachedValue;
                    return auction.save();
                }
                else{
                    throw new Error('auction not found');
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        this.bids.clear();  
    }
    
    lowerAskBid(interval: number) {
        for(const [key, bid] of this.bids){
            const now = new Date()
            const lastBidTime = bid.time;
            if(diffByUnit(lastBidTime, now, TimeUnit.Seconds) >= interval){
                const lowerAsk = bid.lowerAskValue();
                if(lowerAsk){
                    this.io.of('/auctions').to(key).emit('bidAccept', bid.toDto());
                }
            }
        }   
    }
}