import { EventException } from "../../sockets/exceptions/eventException";
import { BidToClient } from "../dtos/bidToClient";
import { TimeUnit, diffByUnit } from "../util/diffByUnit";
import { AuctionRules } from "./auctionRules";

export class AuctionBid {

    public auctionRules: AuctionRules;
    public extendAuction: boolean;
    private _askValue: number;

    constructor(auctionRules: AuctionRules) {
        this.auctionRules = auctionRules;
        this.extendAuction = false;
        this._askValue = auctionRules.startingBid;
    }

    public set askValue(v : number) {

        if(v < this._askValue){
            throw new EventException('invalid bid value');
        }
        
        const increment = this.auctionRules.startingBid * this.auctionRules.bidIncrement;
        this._askValue = v + increment;

        const diff = diffByUnit(new Date(), this.auctionRules.end, TimeUnit.Seconds);
        if(diff <= this.auctionRules.extraTimeSec){
            this.extendAuction = true;
            this.auctionRules.extendAuction()
        }
    }

    public toDto(includeRules: boolean): BidToClient {
        const auctionBidDto = {
            askValue: this._askValue,
            extendAuction: this.extendAuction,
            auctionRules: includeRules ? this.auctionRules : undefined
        }
        return auctionBidDto;
    }
}