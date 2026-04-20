import type { Passport } from "../interfaces"

const URL = "http://localhost:3000/api/passports"


export async function getAllPassports() {
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get passports")
    return await res.json()
}

export async function getOnePassport(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find passport ${id}`)
    return res.json()
}

export async function createPassport(pas: Omit<Passport, 'passport_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pas)
    })
    return res.json()
}

export async function updatePassport(pas:  Omit<Passport, 'passport_id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pas)
    })
    return res.json()
}

export async function removePassport(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete passport ${id}`)
}


