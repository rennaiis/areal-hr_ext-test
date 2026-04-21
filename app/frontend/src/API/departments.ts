import type { Department, DepartmentEdit } from "../interfaces"

const URL = "http://localhost:3000/api/departments"

export async function getAllforOrganization(organization_id: number) {
    const res =  await fetch(`${URL}/org/${organization_id}`);
    if (!res.ok) throw new Error(`can't get departments`)
    return res.json()
}

export async function getAllForOrgFlat(organization_id: number) {
    const res = await fetch(`${URL}/org/flat/${organization_id}`)
    if (!res.ok) throw new Error(`can't get departments`)
    return res.json()

}
export async function getOneDepartment(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find department ${id}`)
}

export async function createDepartment(dep: Omit<Department, 'department_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dep)
    })
    return res.json()
}

export async function updateDepartment( dep: DepartmentEdit, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dep)
    })
    return res.json()
}

export async function removeDepartment(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete department ${id}`)
}