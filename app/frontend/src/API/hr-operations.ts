import type { HrOperation } from "../interfaces"

const URL = "http://localhost:3000/api/hr-operations"

export async function getAllOperations(){
    const res =  await fetch(URL, {
        credentials: 'include',
    })
    if (!res.ok) throw new Error("can't get operations")
    return await res.json()
}


export async function createOperation(op: Omit<HrOperation, 'hr_operation_id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(op)
    })
    return res.json()
}
