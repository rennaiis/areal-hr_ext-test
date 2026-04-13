const URL = "http://localhost:3000/adresses"

interface Adress{
    employee_id: number;
    region: string;
    settlement: string;
    street: string;
    house: string;
    apartment?: string;
    building?: string;
}

export async function getAll() {
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get adresses")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find adresses ${id}`)
    return res.json()
}

export async function create(adr: Adress){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(adr)
    })
    return res.json()
}

export async function update(id: number, adr: Adress) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(adr)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete adress ${id}`)
}


