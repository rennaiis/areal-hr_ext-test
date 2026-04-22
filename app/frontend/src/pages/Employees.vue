<script setup lang="ts">
    import {onMounted, ref, computed} from 'vue'
    import Positions from './Positions.vue';
    import { type Department, type Position, type Employee, type fullHrOperation, type HrOperation, type Organization} from '../interfaces';
    import { getAllEmployees } from '../API/employees';
    import { createOperation, getAllOperations } from '../API/hr-operations';
    import { getAllPositions } from '../API/positions';
    import { getAllForOrgFlat } from '../API/departments';
    import { HrOperationType } from '../../../enums/HrOperationType';
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
    
    
    function chooseEditedEmployee(emp: Employee, type: HrOperationType){
        refresh()
        editOperation.value.employee_id = emp.employee_id
        editOperation.value.operation_type = type
        if (emp.last_operation){
            editOperation.value.department_id = emp.last_operation.department.department_id
            editedEmployeeOrganizationId.value = emp.last_operation.department.organization.organization_id
            editOperation.value.position_id = emp.last_operation.position.position_id
            editOperation.value.salary = emp.last_operation.salary
        }

    }
    async function doOperation(){
        try{
            await createOperation(editOperation.value)
            refresh()
            editOperation.value = {
                employee_id: 0,
                department_id: 0,
                position_id: 0,
                salary: 0,
                operation_type: HrOperationType.FIRE
            }
        }catch(err){
            console.error(err)
        }
    }
    async function fire(emp: Employee) {
        chooseEditedEmployee(emp, HrOperationType.FIRE)
        await doOperation()
    }

    const editOperation = ref<Omit<HrOperation,'hr_operation_id'>>({
        employee_id: 0,
        department_id: 0,
        position_id: 0,
        salary: 0,
        operation_type: HrOperationType.FIRE
    })
    const editedEmployeeOrganizationId = ref<number>(0)
    const departmentsList = ref<Department[]>([])
    const positionsList = ref<Position[]>([])

    async function refresh(){
        try{
            positionsList.value = await getAllPositions()
            if(editedEmployeeOrganizationId.value){
                departmentsList.value = await getAllForOrgFlat(editedEmployeeOrganizationId.value)
            }
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
            <div class="table-item" 
            :class="{'fired': emp.last_operation?.operation_type === HrOperationType.FIRE}">
                {{ emp.last_name }} {{emp.first_name }} {{ emp.middle_name }}
            </div>
            <div class="table-item"
            :class="{'fired': emp.last_operation?.operation_type === HrOperationType.FIRE}"
            >
                {{ emp.last_operation?.department.organization.name || '-' }}
            </div>

            <div
                :class="{'fired': emp.last_operation?.operation_type === HrOperationType.FIRE}"
                v-show="!(editOperation.operation_type == HrOperationType.CHANGE_DEPARTMENT && editOperation.employee_id == emp.employee_id)"
                class="table-item table-item-edit">
                {{ emp.last_operation?.department.name || '-' }}
                <img src="../assets/edit.png" class="icon"  @click="chooseEditedEmployee(emp, HrOperationType.CHANGE_DEPARTMENT)">
            </div>
            <form
                @submit.prevent="doOperation"
                v-show="editOperation.operation_type == HrOperationType.CHANGE_DEPARTMENT && editOperation.employee_id == emp.employee_id"
                class="table-item table-item-edit form-inline" >
                 <select v-model="editOperation.department_id">
                    <option value="" disabled selected></option>
                    <option v-for="dep in departmentsList" 
                    :key="dep.department_id"
                    :value="dep.department_id">
                    {{ dep.name }}
                    </option>
                </select>
                <button>OK</button>
            </form>

            <div 
            :class="{'fired': emp.last_operation?.operation_type === HrOperationType.FIRE}"
            v-show="!(editOperation.operation_type == HrOperationType.CHANGE_POSITION && editOperation.employee_id == emp.employee_id)"
            class="table-item table-item-edit">
                {{emp.last_operation?.position.name || '-'}}
                <img src="../assets/edit.png" class="icon" @click="chooseEditedEmployee(emp, HrOperationType.CHANGE_POSITION)">
            </div>
            <form 
                @submit.prevent="doOperation"
                v-show="editOperation.operation_type == HrOperationType.CHANGE_POSITION && editOperation.employee_id == emp.employee_id"
                class="table-item table-item-edit form-inline">
                <select v-model="editOperation.position_id">
                    <option value="" disabled selected></option>
                    <option v-for="pos in positionsList" 
                    :key="pos.position_id"
                    :value="pos.position_id">
                    {{ pos.name }}
                    </option>
                </select>
                <button>OK</button>
            </form>

            <div 
            :class="{'fired': emp.last_operation?.operation_type === HrOperationType.FIRE}"
            v-show="!(editOperation.operation_type == HrOperationType.CHANGE_SALARY && editOperation.employee_id == emp.employee_id)"
            class="table-item table-item-edit">
                {{ emp.last_operation?.salary || '-' }} ₽
                <img src="../assets/edit.png" class="icon" @click="chooseEditedEmployee(emp, HrOperationType.CHANGE_SALARY)">
            </div>
            <form 
            @submit.prevent="doOperation"
            v-show="editOperation.operation_type == HrOperationType.CHANGE_SALARY && editOperation.employee_id == emp.employee_id"
            class="table-item table-item-edit form-inline">
                <input 
                type="numeric"
                v-model="editOperation.salary">
                <button>OK</button>
            </form>

            <div class="button-row table-item" :class="{'fired': emp.last_operation?.operation_type === HrOperationType.FIRE}">
                <button @click="fire(emp)">Уволить</button>
                <router-link :to="`/employee/${emp.employee_id}`"><button>Информация</button></router-link>
            </div>
        </template>
        
    </div>
    
    

</template>