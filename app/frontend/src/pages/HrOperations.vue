<script setup lang="ts">
    import {onMounted, ref} from 'vue'
    import type { HrOperation } from '../interfaces';
import { getAllOperations } from '../API/hr-operations';
    const operationsList = ref<HrOperation[]>([])
    async function refresh(){
        try{
            operationsList.value = await getAllOperations()
        }catch(err){
            console.error("cant load history")
        }
    }

    onMounted(
        refresh
    )
</script>

<template>
    <div class="table-grid table-history">
    <div class="table-header">id сотрудника</div>
    <div class="table-header">id отдела</div>
    <div class="table-header">id должности</div>
    <div class="table-header">Зарплата</div>
    <div class="table-header">Тип операции</div>
    <template v-for="op in operationsList">
        <div class="table-item">{{op.employee_id}}</div>
        <div class="table-item">{{op.department_id}}</div>
        <div class="table-item">{{op.position_id}}</div>
        <div class="table-item">{{op.salary}}</div>
        <div class="table-item">{{op.operation_type}}</div>
    </template>
    </div>
</template>