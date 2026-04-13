import Employees from "../pages/Employees.vue";

const URL = "http://localhost:3000/employees"
interface Employee {
    last_name: string;
    first_name: string;
    middle_name?: string;
    birth_date: Date;
}

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

export async function create(emp: Employee){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(emp)
    })
    return res.json()
}

export async function update(id: number, emp: Employee) {
    const res = await fetch(`${URL}/${id}`, {
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
