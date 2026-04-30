import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { verify } from '../hashVerifyFuncs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

      
    async validateUser(login: string, password: string): Promise<User|null> {
        const user = await this.userService.findByLogin(login)
        if (!user){
            return null
        }
        const isValid = verify(user.password_hash, password)
        if (!isValid){
            return null
        }
        return user
    }

}
