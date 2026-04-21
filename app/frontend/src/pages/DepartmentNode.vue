<script setup lang="ts">
    import type { Department, DepartmentEdit } from '../interfaces';
    const props = defineProps<{
        dep: Department,
        orgId: number,
        delete: (id: number)=>void, 
        add: (organization_id: number, parent_department_id: number | undefined)=>void,
        editedDepartmentId: number | null, 
        editedDepartment: DepartmentEdit, 
        choseEditDepartment: (dep: Department)=>void,
        editDepartment: ()=> void,
    }>()
</script>

<template>
    <div v-if="dep.department_id !== props.editedDepartmentId">
        <li class="button-row">
            <h4>{{ dep.name }}</h4>
            <img src='../assets/add.png' class="icon" @click="props.add(orgId, props.dep.department_id)">
            <img src="../assets/delete.png" class="icon" @click="props.delete(props.dep.department_id)">
            <img src="../assets/edit.png" class="icon" @click="props.choseEditDepartment(dep)">
        </li>
        <p v-if="dep.comment">{{ dep.comment }}</p>
    </div>
    
    <div v-if="dep.department_id === props.editedDepartmentId">
        <form action="">
            <label for="newDepartmentName"><h4>Название отдела</h4></label>
            <input type="text" id="newDepartmentName" v-model="editedDepartment.name">
            <label for="newDepartmentComment">Комментарий</label>
            <input type="text" id="newDepartmentComment" v-model="editedDepartment.comment">
            <button @click.prevent="editDepartment">Подтвердить</button>
        </form>
    </div>
    <ul v-if="dep.children">
        <DepartmentNode
            v-for="child in props.dep.children"
            :key="child.department_id"
            :dep="child"
            :add="props.add"
            :orgId="orgId"
            :delete="props.delete"
            :editedDepartmentId="props.editedDepartmentId"
            :editedDepartment="props.editedDepartment"
            :choseEditDepartment="props.choseEditDepartment"
            :editDepartment="props.editDepartment"
        />
    </ul>

</template>