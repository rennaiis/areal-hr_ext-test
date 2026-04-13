const URL = "http://localhost:3000/files"
interface File{
    passport_id: number;
    name: string;
    file_path: string;
}


export async function getAll() {
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get files")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find file ${id}`)
    return res.json()
}

export async function create(file: File){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(file)
    })
    return res.json()
}

export async function update(id: number, file: File) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(file)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete file ${id}`)
}

