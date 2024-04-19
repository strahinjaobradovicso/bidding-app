import { EventException } from "../../sockets/exceptions/eventException";
import { BidToClient } from "../dtos/bidToClient";
import { Bidder } from "../interfaces/bidder";
import { AuctionRules } from "./auctionRules";

export class AuctionBid {

    public auctionRules: AuctionRules;
    private _askValue: number;
    public reachedValue: number;
    public time: Date;
    public itemPrice: number;
    public increment: number;
    public bidder?: Bidder;
    private _isFinal = false;

    constructor(auctionRules: AuctionRules, itemPrice: number) {
        this.auctionRules = auctionRules;
        this._askValue = auctionRules.startingBid;
        this.reachedValue = 0;
        this.time = new Date()
        this.itemPrice = itemPrice;
        this.increment = auctionRules.bidIncrement;
    }

    public set askValue(v : number) {

        if(v < this._askValue){
            throw new EventException('invalid bid value');
        }

        this.reachedValue = v;
        this.time = new Date();

        const step = this.itemPrice * this.increment || 1;
        this._askValue = v + step;
    }

    
    public set isFinal(v : boolean) {
        this._isFinal = v;
    }
    

    public lowerAskValue(): number | null {
        const startingIncrement = this.auctionRules.bidIncrement;

        if(this.increment === startingIncrement  ||
            (this.itemPrice >= 10000 && this.increment >= startingIncrement/2)){
            this.increment /= 2;
            this._askValue -= this.increment * this.itemPrice;
            return this._askValue;
        }
        return null;
    }

    public toDto(includeRules: boolean): BidToClient {
        const auctionBidDto = {
            bidder: this.bidder,
            askValue: this._askValue,
            auctionRules: includeRules ? this.auctionRules : undefined,
            reachedValue: this.reachedValue,
            isFinal: this._isFinal
        }
        return auctionBidDto;
    }
}