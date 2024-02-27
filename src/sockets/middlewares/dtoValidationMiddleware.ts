import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { EventResponse, EventStatus } from "../events/eventResponse";

const dtoValidationMiddleware = (type: any, data: any) => {
    return async (next: any) => {
        const obj = plainToInstance(type, data);
        console.log(obj);

        const skipMissingProperties = false;
        const whitelist = false;
        const forbidNonWhitelisted = true;
        const errors:ValidationError[] = await validate(obj, 
            {skipMissingProperties, whitelist, forbidNonWhitelisted});

            let message;

            if(errors.length > 0){
                message = errors.map((error: ValidationError) => {
                    if(error.constraints){
                        return Object.values(error.constraints);
                    }
                    else{
                        return error;
                    }
                }).join(', ')
                console.log(message);
                next(new EventResponse(EventStatus.Failure, message));
            }
            else{
                next();
            }

    }
}
export default dtoValidationMiddleware;