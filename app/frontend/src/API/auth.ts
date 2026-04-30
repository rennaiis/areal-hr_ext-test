import type { User } from "../interfaces"

const URL = "http://localhost:3000/api/auth"
export async function login(login: string, password: string){
    await fetch(`${URL}/login`, {
        method: 'POST', 
        credentials: 'include', 
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            login: login, 
            password:password
        })
    })
}

export async function logout() {
    const res = await fetch(`${URL}/logout`, {
        credentials: 'include', 
        method: 'POST'
    })
    if (!res.ok) {
        throw new Error('Logout failed')
    }
}

export async function getMe() {
    const res = await fetch(`${URL}/me`, {
        credentials: 'include', 
    })
    if (!res.ok) {
        return null
    }
    const user = await res.json()
    return user
}