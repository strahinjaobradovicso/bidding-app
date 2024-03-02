import { EventException } from "../../sockets/exceptions/eventException";
import { auctionNotification } from "../../sockets/notifications/auctionNotification";
import { BidToServer } from "../dtos/bidToServer";
import { AuctionBid } from "../models/auctionBid";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";

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
        return auctionBid;
    },
    clearAuctions: () => {

        for(const [key, bid] of bids){
            auctionNotification.auctionResult(key, bid.reachedValue);
        }

        bids.clear();  
    },
    lowerAskBid: (interval: number) => {

        const auctionsToClose = []

        for(const [key, bid] of bids){
            const now = new Date()
            const lastBidTime = bid.time;
            if(diffByUnit(lastBidTime, now, TimeUnit.Seconds) >= interval){
                const lowerAsk = bid.lowerAskValue();
                if(lowerAsk){
                    auctionNotification.loweredAskBid(key, lowerAsk);
                }
                else{
                    auctionsToClose.push(key);
                }
            }
        }   
        for (const key of auctionsToClose) {
            auctionNotification.auctionResult(key, bids.get(key)!.reachedValue);
            bids.delete(key);
        }
    },
}