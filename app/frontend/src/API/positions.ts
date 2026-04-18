import type { Position } from "../interfaces"

const URL = "http://localhost:3000/api/positions"

export async function getAllPositions(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get positions")
    return await res.json()
}

export async function getOnePosition(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find position ${id}`)
    return res.json()
}

export async function createPosition(pos: Omit<Position, 'position_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pos)
    })
    return res.json()
}

export async function updatePosition(pos: Position) {
    const res = await fetch(`${URL}/${pos.position_id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pos)
    })
    return res.json()
}

export async function removePosition(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete position ${id}`)
}
