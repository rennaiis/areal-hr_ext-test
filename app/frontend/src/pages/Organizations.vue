
<script setup lang="ts">

    import { onMounted, ref} from 'vue';
    import NewDepartment from '../forms/newDepartment.vue';
    import DepartmentNode from './DepartmentNode.vue';
    import type { Department, Organization } from '../interfaces';
    import { createOrganization, getAllOrganizations, removeOrganization, updateOrganization } from '../API/organizations';
    import { getAllforOrganization } from '../API/departments';

    const isDepsOpen = ref(false)
    function change():void{
        isDepsOpen.value = !isDepsOpen.value
    }
    const addDepForm = ref(false)
    function openDepForm(organization_id: number, parent_department_id: number | undefined){
        addDepForm.value = true;
        newDepartment.value = {
            name: '',
            comment: '', 
            organization_id: organization_id, 
            parent_department_id: parent_department_id ?? undefined
        }
    }
    const newDepartment = ref<Omit<Department, 'department_id'> | null>(null)

    const organizationsList = ref<Organization[]>([])
    const departmentsList = ref<Record<number,Department[]>>({})
    const newOrganization = ref<Omit<Organization, 'organization_id'>>({
        name: '',
        comment: ''
    })
    const editedOrganization = ref<Omit<Organization, 'organization_id'>>({
        name: '', 
        comment: ''
    })
    function choseEditOrganization(org: Organization){
        editedOrganizationId.value = org.organization_id
        editedOrganization.value.name = org.name
        editedOrganization.value.comment = org.comment
    }
    const editedOrganizationId = ref<number|null>(null)
    async function deleteOrganization(id: number) {
        try{
            await removeOrganization(id)
        }catch(err){
            console.error('cant delete organization')
        }
        await refresh()
    }
    async function addNewOrganization(){
        try{
            await createOrganization(newOrganization.value);
            newOrganization.value = {
                name: '',
                comment: ''
            };
            await refresh();
        }catch(err){
            console.error('cant add organisation')
        }       
    }
    async function editOrganization() {
        try{
            if (editedOrganizationId.value){
                await updateOrganization(editedOrganization.value, editedOrganizationId.value)
                editedOrganizationId.value = null
                await refresh()
            }
        }catch(err){
            console.error('cant edit organization')
        }
        
    }

    async function refresh() {
        try{
            organizationsList.value = await getAllOrganizations()
            for (let org of organizationsList.value){
                const tree = await getAllforOrganization(org.organization_id)
                departmentsList.value[org.organization_id] = tree
            }
            console.log(departmentsList.value);
        }catch(err){
            console.error('Ошибка при загрузке страницы')
        }   
    }

    onMounted(
        refresh
    )

</script>
<template>
    <div class = "block" v-for="organization in organizationsList" :key="organization.organization_id" :value="organization">
        <div v-if="editedOrganizationId != organization.organization_id">
            <div class = "org-header">
                <h3>{{organization.name}}</h3>
            </div>
            <p>{{ organization.comment }}</p>
        </div>
        <div v-if="editedOrganizationId == organization.organization_id">
            <form action="" >
                <div class = "org-header">
                    <label for="newOrganizationName"><h3>Название организации</h3></label>
                </div>
                <input type="text" id="newName" v-model="editedOrganization.name">
                <label for="newOrganizationComment" >Комментарий</label>
                <input type="text" id="newOrganizationComment" v-model="editedOrganization.comment">
                <button @click.prevent="editOrganization">Подтвердить</button>       
            </form>
            
        </div>

        <div class="button-row">
            <button @click="choseEditOrganization(organization)">Редактировать</button>
            <button @click="deleteOrganization(organization.organization_id)">Удалить</button>
        </div>
        <div class = "org-header">
            <div  class="button-row">
                <h3>Отделы</h3>
                <img src='../assets/add.png' class="icon" @click="openDepForm(organization.organization_id, undefined)">
            </div>
            <h2 v-if="!isDepsOpen" @click="change" class="arrow">∨</h2>
            <h2 v-if="isDepsOpen" @click="change" class="arrow">∧</h2>
        </div>
        <div v-if="isDepsOpen">  
            <ul>
                <template v-if="departmentsList && departmentsList[organization.organization_id]">
                    <DepartmentNode
                    v-for="dep in departmentsList[Number(organization.organization_id)]"
                    :key="dep.department_id" 
                    :dep="dep"   
                    :add="openDepForm"
                    :orgId="organization.organization_id"
                />
                </template> 
            </ul>
        </div>  
         

        
    </div>
    
    <form action="" class="form-inline">
        <div class="form-item">
            <label for="org-name">Название организации</label>
            <input class="window-input" id="org-name" type="text" v-model="newOrganization.name">
        </div>
        <div class="form-item">
            <label for="org-comment">Комментарий</label>
            <input class="window-input" id="org-comment" type="text" v-model="newOrganization.comment">
        </div>
        <button @click.prevent="addNewOrganization">Добавить организацию</button>
    </form>
    <div v-if="addDepForm">
        <NewDepartment
            v-if="newDepartment"
            v-bind="newDepartment"
            @close="addDepForm = false"
            @refresh="refresh"
        ></NewDepartment>
    </div>
    
    
</template>