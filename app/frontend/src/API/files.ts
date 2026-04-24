const URL = "http://localhost:3000/api/files"

export async function createFiles(passport_id: number, files: File[]) {
    const formData = new FormData()
    files.forEach(f =>{
        formData.append('files', f)
    })
    const res = await fetch(`${URL}/uploadFiles/${passport_id}`, {
        method: 'POST',
        body: formData
    })
    return res.json()
}

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

export async function removeFile(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete file ${id}`)
}

