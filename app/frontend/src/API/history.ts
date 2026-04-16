import type { HistoryItem } from "../interfaces";
const URL = "http://localhost:3000/history"


export async function getAll(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get history")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find history note ${id}`)
    return res.json()
}

export async function create(hist: Omit<HistoryItem, 'history_item_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(hist)
    })
    return res.json()
}


