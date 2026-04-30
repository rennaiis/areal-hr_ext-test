import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async hash(password: string){
        return argon2.hash(password, {
            type: argon2.argon2id
        })
    }
    async verify(hash: string, password: string){
        return argon2.verify(hash, password)
    }
    
    async validateUser(login: string, password: string): Promise<User|null> {
        const user = await this.userService.findByLogin(login)
        if (!user){
            return null
        }
        const isValid = this.verify(user.password_hash, password)
        if (!isValid){
            return null
        }
        return user
    }

}
