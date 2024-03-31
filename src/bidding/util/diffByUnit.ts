export enum TimeUnit {
    Seconds = 1000,
    Hours = 1000 * 3600,
    Days = 1000 * 3600 * 24
}

export const diffByUnit = (date1: Date, date2: Date, unit: TimeUnit) => {
    return (date2.getTime() - date1.getTime()) / unit;
}