import { UserRoles } from "../../enums/UserRoles"
import { UserService } from "./user/user.service"

export async function makeAdmin(userService: UserService) {
    const existing = await userService.findByLogin('init_admin')
    if (!existing){
        await userService.create({
        login: 'init_admin',
        password_hash: '12345678', 
        role: UserRoles.ADMIN,
        first_name: 'Name',
        last_name: 'Name',
        })
    }else{
        return
    }
}