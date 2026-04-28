import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    async hash(password: string){
        return argon2.hash(password, {
            type: argon2.argon2id
        })
    }
    async verify(hash: string, password: string){
        return argon2.verify(hash, password)
    }
    

}
