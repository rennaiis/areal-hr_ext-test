const URL = "http://localhost:3000/positions"

interface Position {
    name: string;
}

export async function getAll(){
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get positions")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find position ${id}`)
    return res.json()
}

export async function create(pos: Position){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pos)
    })
    return res.json()
}

export async function update(id: number, pos: Position) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pos)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete position ${id}`)
}
