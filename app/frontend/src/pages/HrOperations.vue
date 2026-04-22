<script setup lang="ts">
    import {onMounted, ref} from 'vue'
    import type { fullHrOperation} from '../interfaces';
import { getAllOperations } from '../API/hr-operations';
    const operationsList = ref<fullHrOperation[]>([])
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
    <div class="table-grid table-operations">
    <div class="table-header">Сотрудник</div>
    <div class="table-header">Дата</div>
    <div class="table-header">Отдел</div>
    <div class="table-header">Должность</div>
    <div class="table-header">Зарплата</div>
    <div class="table-header">Тип операции</div>
    <template v-for="op in operationsList">
        <div class="table-item">{{op.employee.last_name}}{{ op.employee.first_name }}</div>
        <div class="table-item">{{(op.created_at).slice(0,10)}}</div>
        <div class="table-item">{{op.department.name}}</div>
        <div class="table-item">{{op.position.name}}</div>
        <div class="table-item">{{op.salary}}</div>
        <div class="table-item">{{op.operation_type}}</div>
    </template>
    </div>
</template>