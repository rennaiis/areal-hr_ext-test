<script setup lang="ts">
    import { ref } from 'vue';
    import type { Department } from '../interfaces';
    import DepartmentNode from './DepartmentNode.vue'
    const props = defineProps<{dep: Department}>()
    const addDepForm = ref(false)
</script>

<template>
    <li class="button-row">
        <h4>{{ dep.name }}</h4>
        <img src='../assets/add.png' class="icon" @click="addDepForm = true">
        <img src="../assets/delete.png" class="icon">
        <img src="../assets/edit.png" class="icon">
    </li>
    <p>{{ dep.comment }}</p>
    <ul v-if="dep.children">
        <DepartmentNode
            v-for="child in dep.children"
            :key="child.department_id"
            :dep="child"
        />
    </ul>

    <div v-if="addDepForm">
        <NewDepartment></NewDepartment>
    </div>
</template>