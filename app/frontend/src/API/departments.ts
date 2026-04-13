const URL = "http://localhost:3000/departments"
interface Department {
    department_id: number;
    organization_id: number;
    parent_department_id?: number;
    name: string;
    comment?: string;
    children?: Department[]
}

function toTree(departments: Department[], parentId: number | null): Department[]{
    const children = departments.filter(dep => {
        const currentParent = dep.parent_department_id || null
        if (currentParent === parentId){
            return true
        }else{
            return false
        }
    })
    return children.map((child: Department): Department => {
        return{
            ...child, 
            children: toTree(departments, child.department_id)
        }
    })

}

export async function getAll(organization_id: number) {
    const res =  await fetch(`${URL}?organization_id=${organization_id}`);
    if (!res.ok) throw new Error(`can't get departments of organization ${organization_id}`)
    const departments = await res.json()
    return toTree(departments, null)
}


export async function getOne(id: number) {
    const res =  await fetch(`${URL}/${id}`)
    if (!res.ok) throw new Error(`can't find department ${id}`)
    return res.json()
}

export async function create(dep: Omit<Department, 'department_id'>){
    const res = await fetch(URL, {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dep)
    })
    return res.json()
}

export async function update(id: number, dep: Omit<Department, 'department_id'>) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dep)
    })
    return res.json()
}

export async function remove(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete department ${id}`)
}