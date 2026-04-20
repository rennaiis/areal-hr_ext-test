<script setup lang="ts">
    import { ref } from 'vue';
    import type { Department } from '../interfaces';
    const props = defineProps<{dep: Department, orgId: number, delete: (id: number)=>void, add: (organization_id: number, parent_department_id: number | undefined)=>void}>()
</script>

<template>
    <li class="button-row">
        <h4>{{ dep.name }}</h4>
        <img src='../assets/add.png' class="icon" @click="props.add(orgId, props.dep.department_id)">
        <img src="../assets/delete.png" class="icon" @click="props.delete(props.dep.department_id)">
        <img src="../assets/edit.png" class="icon">
    </li>
    <p>{{ dep.comment }}</p>
    <ul v-if="dep.children">
        <DepartmentNode
            v-for="child in props.dep.children"
            :key="child.department_id"
            :dep="child"
            :add="props.add"
            :orgId="orgId"
            :delete="props.delete"
        />
    </ul>

</template>