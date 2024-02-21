import { AuctionBidDto } from "../dtos/auctionBidDto";
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
            throw new Error('invalid bid value');
        }
        
        const increment = this.auctionRules.startingBid * this.auctionRules.bidIncrement;
        this._askValue = v + increment;

        const diff = diffByUnit(new Date(), this.auctionRules.auctionEnd, TimeUnit.Seconds);
        if(diff <= this.auctionRules.auctionExtraTime){
            this.extendAuction = true;
            this.auctionRules.extendAuction()
        }
    }

    public toDto(includeRules: boolean): AuctionBidDto {
        const auctionBidDto = {
            askValue: this.askValue,
            extendAuction: this.extendAuction,
            auctionRules: includeRules ? this.auctionRules : undefined
        }
        return auctionBidDto;
    }
}