import type { Organization } from "../interfaces"

const URL = "http://localhost:3000/api/organizations"

export async function getAllOrganizations(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get organizations")
    return await res.json()
}

export async function getOneOrganization(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find organizations ${id}`)
    return res.json()
}

export async function createOrganization(org: Omit<Organization, 'organization_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(org)
    })
    return res.json()
}

export async function updateOrganization(org: Organization) {
    const res = await fetch(`${URL}/${org.organization_id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(org)
    })
    return res.json()
}

export async function removeOrganization(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete organization ${id}`)

}
