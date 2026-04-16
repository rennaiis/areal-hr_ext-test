const URL = "http://localhost:3000/files"
import type { File } from "../interfaces"

export async function getAllFiles() {
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get files")
    return await res.json()
}

export async function getOneFile(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find file ${id}`)
    return res.json()
}

export async function createFile(file: Omit<File, "file_id">){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(file)
    })
    return res.json()
}

export async function updateFile(file: File) {
    const res = await fetch(`${URL}/${file.file_id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(file)
    })
    return res.json()
}

export async function removeFile(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete file ${id}`)
}

