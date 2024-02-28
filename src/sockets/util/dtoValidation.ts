import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

const dtoValidation = async (type: any, data: any) => {
    
    const obj = plainToInstance(type, data);

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
            return message;
        }
        else{
            return null;
        }

}
export default dtoValidation;