export const addSeconds = (seconds: number): Date => {
    const date = new Date()
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}