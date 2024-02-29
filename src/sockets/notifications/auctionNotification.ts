import { SocketServer } from "../socketServer";

const NAMESPACE = '/auction';

const auctionResult = (auctionKey: string, reachedValue: number) => {
    const io = SocketServer.getInstance();
    io.of(NAMESPACE).to(auctionKey).emit("auctionResult", auctionKey, reachedValue);
}

const loweredAskBid = (auctionKey: string, lowerAsk: number) => {
    const io = SocketServer.getInstance();
    io.of(NAMESPACE).to(auctionKey).emit("loweredAskBid", auctionKey, lowerAsk);
}

export const auctionNotification = {
    auctionResult,
    loweredAskBid
}