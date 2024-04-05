import { AuctionStatus } from "../models/auction";

const dummyAuctions = [
    {
        start: addMinutes(new Date(), 1),
        last_bid: 0,
        status: AuctionStatus.Upcoming,
        item_id:1,
        owner_id:1,
        starting_bid:100,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        start: addMinutes(new Date(), 2),
        last_bid: 0,
        status: AuctionStatus.Upcoming,
        item_id:2,
        owner_id:2,
        starting_bid:900,
        created_at: new Date(),
        updated_at: new Date()
    },
]

function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
export default dummyAuctions;