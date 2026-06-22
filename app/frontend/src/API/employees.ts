import type { Employee, HireEmployee } from "../interfaces"

const URL = "http://localhost:3000/api/employees"
export async function getAllEmployees(){
    const res =  await fetch(URL, {
        credentials: 'include'
    })
    if (!res.ok) throw new Error("can't get employees")
    return await res.json()
}

export async function hireEmployee(emp: HireEmployee, files: File[]) {
    const formData = new FormData()
    formData.append('employee', JSON.stringify(emp.employee))
    formData.append('adress', JSON.stringify(emp.adress))
    formData.append('passport', JSON.stringify(emp.passport))
    files.forEach(f =>{
        formData.append('files', f)
    })
    const res = await fetch(`${URL}/hire`, {
        method: 'POST',
        body: formData, 
        credentials: 'include'
    })
    return res.json()
}
export async function getOneEmployee(id: number) {
    const res =  await fetch(`${URL}/${id}`, {
        credentials: 'include',
    })
    if (!res.ok) throw new Error(`can't find employee ${id}`)
    return res.json()
}

export async function updateEmployee(emp: Omit<Employee, 'employee_id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(emp)
    })
    return res.json()
}

export async function removeEmployee(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete employee ${id}`)
}
