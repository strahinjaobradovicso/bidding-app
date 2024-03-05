import { EventException } from "../../sockets/exceptions/eventException";
import { SocketServer } from "../../sockets/socketServer";
import { BidToServer } from "../dtos/bidToServer";
import { AuctionBid } from "../models/auctionBid";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";
import DB from "../../database";
import { Bidder } from "../interfaces/bidder";
import { AuctionStatus } from "../../database/models/auction";

const bids = new Map<string, AuctionBid>;

interface BidStoreService {
    setBid: (key: string, bid: AuctionBid) => void
    getBid: (key: string) => AuctionBid
    placeBid: (bidder: Bidder, bid: BidToServer) => AuctionBid
    clearAuctions: () => void
    lowerAskBid: (interval: number) => void
}

export const bidStoreClient: BidStoreService = {
    setBid: (key: string, bid: AuctionBid) => {
        bids.set(key, bid);
    },
    getBid: (key: string) => {
        const auctionBid = bids.get(key);
        if(!auctionBid){
            throw new EventException('auction is not active');
        }
        return auctionBid;
    },
    placeBid: (bidder: Bidder, bid: BidToServer) => {
        const key = bid.auctionId;
        const value = bid.value;

        const auctionBid = bidStoreClient.getBid(key);
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
    },
    clearAuctions: () => {

        for(const [key, bid] of bids){
            const io = SocketServer.getInstance();
            io.of('/auctions').to(key).emit("auctionResult", key, bid.toDto(false));

            DB.Auction.findByPk(key)
            .then(auction => {
                if(auction){
                    auction.status = AuctionStatus.Done;
                    auction.userId = bid.bidder?bid.bidder.id:undefined;
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

        bids.clear();  
    },
    lowerAskBid: (interval: number) => {
        const io = SocketServer.getInstance();

        for(const [key, bid] of bids){
            const now = new Date()
            const lastBidTime = bid.time;
            if(diffByUnit(lastBidTime, now, TimeUnit.Seconds) >= interval){
                const lowerAsk = bid.lowerAskValue();
                if(lowerAsk){
                    io.of('/auctions').to(key).emit("loweredAskBid", key, lowerAsk);
                }
            }
        }   
    },
}