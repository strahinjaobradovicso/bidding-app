import { EventException } from "../../sockets/exceptions/eventException";
import { AuctionBid } from "../models/auctionBid";

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
            throw new EventException('auction is not active');
        }
        return auctionBid;
    },
    placeBid: (key: string, value: number) => {
        const auctionBid = bidStoreClient.getBid(key);
        auctionBid.askValue = value;
        return auctionBid;
    }
}