export class EventException extends Error{

    public message: string

    constructor(message?: string){
        super(message)
        this.message = message || 'Something went wrong'
    }
}