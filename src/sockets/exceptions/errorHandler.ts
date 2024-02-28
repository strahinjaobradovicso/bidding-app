import { Socket } from "socket.io";
import { EventException } from "./eventException";
import { ToClientEvents, ToServerEvents } from "../events/auctionEvents";
import { EventResponse, EventStatus } from "../events/eventResponse";

const socketErrorHandler = (socket: Socket<ToServerEvents, ToClientEvents>, event:any, error: any) => {

    const eventResponse = new EventResponse(EventStatus.Failure);

    if(!(error instanceof EventException)){
        error = new EventException();
    }

    eventResponse.message = error.message;
    socket.emit(event, eventResponse);

}

export default socketErrorHandler;