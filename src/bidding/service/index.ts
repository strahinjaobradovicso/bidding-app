import { EventException } from "../../sockets/exceptions/eventException";
import { SocketServer } from "../../sockets/socketServer";
import { AuctionBid } from "../models/auctionBid";

const bids = new Map<string, AuctionBid>;

interface BidStoreService {
    setBid: (key: string, bid: AuctionBid) => void
    getBid: (key: string) => AuctionBid
    placeBid: (key: string, value: number) => AuctionBid
    clearAuctions: () => void
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
        auctionBid.reachedValue = value;
        return auctionBid;
    },
    clearAuctions: () => {
        const io = SocketServer.getInstance();

        for(const [key, bid] of bids){
            io.of('/auction').to(key).emit("auctionResult", bid.reachedValue);
        }

        bids.clear();  
    },
}