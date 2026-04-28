import type { Adress } from "../interfaces"

const URL = "http://localhost:3000/api/adresses"

export async function getOneAdress(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find adresses ${id}`)
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

