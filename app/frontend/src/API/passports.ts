interface Passport{
    employee_id: number;
    series: string;
    number: string;
    issued_by: string;
    issue_date: Date;
    department_code: string;
}
const URL = "http://localhost:3000/passports"


export async function getAll() {
    const res =  await fetch(URL)
    if (!res.ok) throw new Error("can't get passports")
    return await res.json()
}

export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find passport ${id}`)
    return res.json()
}

export async function create(pas: Passport){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pas)
    })
    return res.json()
}

export async function update(id: number, pas: Passport) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(pas)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete passport ${id}`)
}


