import { addSeconds } from "../../bidding/util/addSeconds"
import { TimeUnit, diffByUnit } from "../../bidding/util/diffByUnit";

describe('date diff by unit', () => {
    const date1 = new Date()

    it('date diff by seconds', () => {
        const seconds = 20;
        const date2 = addSeconds(seconds);
        const secondsDiff = diffByUnit(date1, date2, TimeUnit.Seconds);
        expect(secondsDiff).toBe(seconds);
    })

    it('date diff by hours', () => {
        const hours = 2;
        const seconds = hours * (60 * 60);
        const date2 = addSeconds(seconds);
        const hoursDiff = diffByUnit(date1, date2, TimeUnit.Hours);
        expect(hoursDiff).toBe(hours);
    })

    it('date diff by days', () => {
        const days = 5;
        const seconds = days * (60 * 60 * 24);
        const date2 = addSeconds(seconds);
        const daysDiff = diffByUnit(date1, date2, TimeUnit.Days);
        expect(daysDiff).toBe(days);
    })
})