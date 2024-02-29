import * as crypto from 'crypto';

export const saltAndHash = (plainPassword: string, salt?: string): 
    {salt: string, hashedPassword: string} => {

    const saltValue = salt? salt : crypto.randomBytes(16).toString('hex')
    const hashedPasswordValue = crypto.pbkdf2Sync(plainPassword, 
        saltValue, 1000, 64, 'sha512').toString('hex')
    
    return {salt: saltValue, hashedPassword: hashedPasswordValue};
}