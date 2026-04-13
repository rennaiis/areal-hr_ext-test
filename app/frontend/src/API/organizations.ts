const URL = "http://localhost:3000/organizations"


interface Organization{
    name: string;
    comment?: string;
}


export async function getAll(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get organizations")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find organizations ${id}`)
    return res.json()
}

export async function create(org: Organization){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(org)
    })
    return res.json()
}

export async function update(id: number, org: Organization) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(org)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete organization ${id}`)

}
