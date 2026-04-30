import type { Passport } from "../interfaces"

const URL = "http://localhost:3000/api/passports"

export async function getOnePassport(id: number) {
    const res =  await fetch(`${URL}/${id}`, {
        credentials: 'include',
    })
    if (!res.ok) throw new Error(`can't find passport ${id}`)
    return res.json()
}

export async function updatePassport(pas:  Omit<Passport, 'passport_id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pas),
        credentials: 'include'
    })
    return res.json()
}


