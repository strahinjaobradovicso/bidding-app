import { EventException } from "../../sockets/exceptions/eventException";
import { SocketServer } from "../../sockets/socketServer";
import { AuctionBid } from "../models/auctionBid";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";

const bids = new Map<string, AuctionBid>;

interface BidStoreService {
    setBid: (key: string, bid: AuctionBid) => void
    getBid: (key: string) => AuctionBid
    placeBid: (key: string, value: number) => AuctionBid
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
    placeBid: (key: string, value: number) => {
        const auctionBid = bidStoreClient.getBid(key);
        auctionBid.askValue = value;
        return auctionBid;
    },
    clearAuctions: () => {
        const io = SocketServer.getInstance();

        for(const [key, bid] of bids){
            io.of('/auction').to(key).emit("auctionResult", bid.reachedValue);
        }

        bids.clear();  
    },
    lowerAskBid: (interval: number) => {
        const io = SocketServer.getInstance();

        const auctionsToClose = []

        for(const [key, bid] of bids){
            const now = new Date()
            const lastBidTime = bid.time;
            if(diffByUnit(lastBidTime, now, TimeUnit.Seconds) >= interval){
                const lowerAsk = bid.lowerAskValue();
                if(lowerAsk){
                    io.of('/auction').to(key).emit("loweredAskBid", lowerAsk);
                }
                else{
                    auctionsToClose.push(key);
                }
            }
        }   
        for (const key of auctionsToClose) {
            io.of('/auction').to(key).emit("auctionResult", bids.get(key));
            bids.delete(key);
        }
    },
}