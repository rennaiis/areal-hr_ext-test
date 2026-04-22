<script setup lang="ts">
    import {onMounted, ref} from 'vue'
    import Positions from './Positions.vue';
    import type { Employee } from '../interfaces';
    import { getAllEmployees } from '../API/employees';
    const isPosOpen = ref<boolean>(false)
    function closePositions(){
        isPosOpen.value = false
    }
    const employeesList = ref<Employee[]>([])
    async function refresh(){
        try{
            employeesList.value = await getAllEmployees()
        }catch(err){
            console.error('cant load  page')
        }
    }
    onMounted(
        refresh
    )

</script>

<template>
    <div v-if="isPosOpen">
        <Positions
        :close="closePositions"/>
    </div>
    <div class="button-row">
        <router-link to="/hireEmployee"><button>Нанять сотрудника</button></router-link>
        <button @click.prevent="isPosOpen = true">Должности</button>
    </div>
    

    <div class="table-grid table-employees">
        <div class="table-header">ФИО</div>
        <div class="table-header">Организация</div>
        <div class="table-header">Отдел</div>
        <div class="table-header">Должность</div>
        <div class="table-header">Зарплата</div>
        <div class="table-header">Действия</div>
        
        <template v-for="emp in employeesList">
            <div class="table-item">{{ emp.last_name }} {{emp.first_name }} {{ emp.middle_name }}</div>
            <div class="table-item">ООО "Компания"</div>
            <div class="table-item">it</div>
            <div class="table-item">Программист</div>
            <div class="table-item">50 000 ₽</div>
            <div class="button-row table-item" >
                <button>Изменить</button>
                <button>Уволить</button>
                <router-link :to="`/employee/${emp.employee_id}`"><button>Информация</button></router-link>
                
            </div>
        </template>
        
    </div>
    
    

</template>