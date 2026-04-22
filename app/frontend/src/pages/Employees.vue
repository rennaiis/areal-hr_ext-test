<script setup lang="ts">
    import {onMounted, ref, computed} from 'vue'
    import Positions from './Positions.vue';
    import type { Employee, fullHrOperation} from '../interfaces';
    import { getAllEmployees } from '../API/employees';
    import { getAllOperations } from '../API/hr-operations';
    const isPosOpen = ref<boolean>(false)
    function closePositions(){
        isPosOpen.value = false
    }
    const employeesList = ref<Employee[]>([])
    const operationsList = ref<fullHrOperation[]>([])

    const employeesLastOperations = computed<Employee[]>(() => {
        let emps: Employee[] = employeesList.value
        let ops: fullHrOperation[] = operationsList.value
        return emps.map(emp =>{
            const lastOp = [...ops].reverse().find(op=>
                op.employee.employee_id == emp.employee_id
            )
            return{
                ...emp, 
                last_operation: lastOp
            }
        }) 
    })
    

    async function refresh(){
        try{
            employeesList.value = await getAllEmployees()
            operationsList.value = await getAllOperations()
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
        
        <template v-for="emp in employeesLastOperations" :key="emp.employee_id">
            <div class="table-item">{{ emp.last_name }} {{emp.first_name }} {{ emp.middle_name }}</div>
            <div class="table-item">{{ emp.last_operation?.department.organization.name || '-' }}</div>
            <div class="table-item">{{ emp.last_operation?.department.name || '-' }}</div>
            <div class="table-item">{{emp.last_operation?.position.name || '-'}}</div>
            <div class="table-item">{{ emp.last_operation?.salary || '-' }} ₽</div>
            <div class="button-row table-item" >
                <button>Изменить</button>
                <button>Уволить</button>
                <router-link :to="`/employee/${emp.employee_id}`"><button>Информация</button></router-link>
                
            </div>
        </template>
        
    </div>
    
    

</template>