import { AuctionBid } from "../interfaces/auctionBid";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";

const bids = new Map<string, AuctionBid>;

interface BidStoreService {
    setBid: (key: string, bid: AuctionBid) => void
    getBid: (key: string) => AuctionBid
    placeBid: (key: string, value: number) => AuctionBid
}

export const bidStoreClient: BidStoreService = {
    setBid: (key: string, bid: AuctionBid) => {
        bids.set(key, bid);
    },
    getBid: (key: string) => {
        const auctionBid = bids.get(key);
        if(!auctionBid){
            throw new Error('auction bid not found');
        }
        return auctionBid;
    },
    placeBid: (key: string, value: number) => {
        const auctionBid = bidStoreClient.getBid(key);
        if(value >= auctionBid.askValue){
            auctionBid.askValue = value + auctionBid.startingValue * auctionBid.increment;
            const diff = diffByUnit(new Date(), auctionBid.auctionEnd, TimeUnit.Seconds);
            if(diff <= auctionBid.auctionExtraTime){
                auctionBid.extendAuction = true;
            }
        }
        else{
            throw new Error('bid rejected')
        }
        return auctionBid;
    }
}