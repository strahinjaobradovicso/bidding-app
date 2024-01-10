const dummyAuctions = [
    {
        start: addMinutes(new Date(), 1),
        last_bid: 200,
        status: 'upcoming',
        item_id:1,
        user_id:null,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        start: addMinutes(new Date(), 2),
        last_bid: 1800,
        status: 'upcoming',
        item_id:2,
        user_id:null,
        created_at: new Date(),
        updated_at: new Date()
    },
]

function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
export default dummyAuctions;