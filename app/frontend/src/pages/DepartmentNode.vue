<script setup lang="ts">
    import { ref } from 'vue';
    import type { Department } from '../interfaces';
    const props = defineProps<{dep: Department, orgId: number, add: (organization_id: number, parent_department_id: number | undefined)=>void}>()
</script>

<template>
    <li class="button-row">
        <h4>{{ dep.name }}</h4>
        <img src='../assets/add.png' class="icon" @click="add(orgId, dep.department_id)">
        <img src="../assets/delete.png" class="icon">
        <img src="../assets/edit.png" class="icon">
    </li>
    <p>{{ dep.comment }}</p>
    <ul v-if="dep.children">
        <DepartmentNode
            v-for="child in dep.children"
            :key="child.department_id"
            :dep="child"
            :add="add"
            :orgId="orgId"
        />
    </ul>

</template>