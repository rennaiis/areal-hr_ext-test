import type { Employee } from "../interfaces"

const URL = "http://localhost:3000/employees"
export async function getAll(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get employees")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find employee ${id}`)
    return res.json()
}

export async function create(emp: Omit<Employee, 'employee_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(emp)
    })
    return res.json()
}

export async function update(emp: Employee) {
    const res = await fetch(`${URL}/${emp.employee_id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(emp)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete employee ${id}`)
}
