import { SCHEDULE_TO_START_MIN_DAYS } from "../../services/AuctionService"
import { auctionService } from "../../services/AuctionService"

describe('auction service', () => {

    it('start valid, return true', () => {
        const start = new Date()
        start.setDate(start.getDate() + SCHEDULE_TO_START_MIN_DAYS)
        expect(auctionService.isStartTimeValid(start)).toEqual(true)

    })

    it('start not valid, return false', () => {
        const start = new Date()
        expect(auctionService.isStartTimeValid(start)).toEqual(false)
    })

})