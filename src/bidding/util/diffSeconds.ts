export const diffSeconds = (date1: Date, date2: Date) => {
    return (date2.getTime() - date1.getTime()) / 1000;
}