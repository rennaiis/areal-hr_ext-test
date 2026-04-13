import type { HrOperationType } from "../../../enums/HrOperationType";
const URL = "http://localhost:3000/hr-operations"
interface HrOperation{
    employee_id: number;
    department_id: number;
    position_id: number;
    salary: number;
    operation_type: HrOperationType
}

export async function getAll(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get operations")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find operation ${id}`)
    return res.json()
}

export async function create(op: HrOperation){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(op)
    })
    return res.json()
}
