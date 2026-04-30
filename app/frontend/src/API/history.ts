// import type { HistoryItem } from "../interfaces";
const URL = "http://localhost:3000/api/history"


export async function getAllHistory(){
    const res =  await fetch(URL, {
        credentials: 'include',
    })
    if (!res.ok) throw new Error("can't get history")
    return await res.json()
}


