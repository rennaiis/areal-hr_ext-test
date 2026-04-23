import type {  editUser, User } from "../interfaces"

const URL = "http://localhost:3000/api/user"
export async function getAllUsers(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get users")
    return await res.json()
}

export async function getOneUser(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find employee ${id}`)
    return res.json()
}

export async function createUser(user: Omit<User, 'user_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    })
    return res.json()
}

export async function updateUser(user: editUser, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    })
    return res.json()
}

export async function removeUser(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete user ${id}`)
}
