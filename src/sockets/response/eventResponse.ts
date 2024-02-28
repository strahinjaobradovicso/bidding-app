export enum EventStatus {
    Success = 'SUCCESS',
    Failure = 'FAILURE'
}

export class EventResponse {

    public status: EventStatus
    public message?: string
    
    constructor(status: EventStatus, message?: string) {
        this.status = status
        this.message = message
    }
}