import { EventException } from "../../sockets/exceptions/eventException";
import { SocketServer } from "../../sockets/socketServer";
import { BidToServer } from "../dtos/bidToServer";
import { AuctionBid } from "../models/auctionBid";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";
import DB from "../../database";

const bids = new Map<string, AuctionBid>;

interface BidStoreService {
    setBid: (key: string, bid: AuctionBid) => void
    getBid: (key: string) => AuctionBid
    placeBid: (userId: number, bid: BidToServer) => AuctionBid
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
    placeBid: (userId: number, bid: BidToServer) => {
        const key = bid.auctionId;
        const value = bid.value;

        const auctionBid = bidStoreClient.getBid(key);
        auctionBid.askValue = value;
        auctionBid.userId = userId;

        DB.Bid.create({
            auctionId: Number(key),
            userId: userId,
            value: value
        });
        return auctionBid;
    },
    clearAuctions: () => {

        for(const [key, bid] of bids){
            const io = SocketServer.getInstance();
            io.of('/auctions').to(key).emit("auctionResult", key, bid.reachedValue);
        }

        bids.clear();  
    },
    lowerAskBid: (interval: number) => {
        const io = SocketServer.getInstance();
        let auctionsToClose = []

        for(const [key, bid] of bids){
            const now = new Date()
            const lastBidTime = bid.time;
            if(diffByUnit(lastBidTime, now, TimeUnit.Seconds) >= interval){
                const lowerAsk = bid.lowerAskValue();
                if(lowerAsk){
                    io.of('/auctions').to(key).emit("loweredAskBid", key, lowerAsk);
                }
                else{
                    auctionsToClose.push(key);
                }
            }
        }   
        for (const key of auctionsToClose) {
            const bid = bids.get(key);
            io.of('/auctions').to(key).emit("auctionResult", key, bid!.reachedValue);
            bids.delete(key);
        }
        auctionsToClose = []
    },
}