import type { Adress } from "../interfaces"

const URL = "http://localhost:3000/api/adresses"

export async function getAllAdresses() {
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get adresses")
    return await res.json()
}

export async function getOneAdress(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find adresses ${id}`)
    return res.json()
}


export async function createAdress(adr: Omit<Adress, 'adress_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(adr)
    })
    return res.json()
}

export async function updateAdress(adr: Omit<Adress, 'adress_id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(adr)
    })
    return res.json()
}

export async function removeAdress(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete adress ${id}`)
}


