<script setup lang="ts">
    import {onMounted, ref, computed, reactive, watch} from 'vue'
    import Positions from './Positions.vue';
    import { type Department, type Position, type Employee, type fullHrOperation, type HrOperation, type Organization, type FilterEmployees} from '../interfaces';
    import { getAllEmployees } from '../API/employees';
    import { createOperation, getAllOperations } from '../API/hr-operations';
    import { getAllPositions } from '../API/positions';
    import { getAllDepartments, getAllForOrgFlat } from '../API/departments';
    import { HrOperationType } from '../../../enums/HrOperationType';
    import { getAllOrganizations } from '../API/organizations';
import { currentUser } from '../currentUser';
import { UserRoles } from '../../../enums/UserRoles';
    const isPosOpen = ref<boolean>(false)
    function closePositions(){
        isPosOpen.value = false
    }
    
    const employeesList = ref<Employee[]>([])
    const operationsList = ref<fullHrOperation[]>([])
    const employeesLastOperations = computed<Employee[]>(() => {
        let emps: Employee[] = employeesList.value
        let ops: fullHrOperation[] = operationsList.value
        emps = emps.map(emp =>{
            const lastOp = [...ops].reverse().find(op=>
                op.employee.employee_id == emp.employee_id
            )
            return{
                ...emp, 
                last_operation: lastOp
            }
        })
        let filtered = emps
        if (filterEmployees.chosenFilterOrganization != 'all'){
            filtered = emps.filter ( emp => emp.last_operation?.department.organization.organization_id == filterEmployees.chosenFilterOrganization)
        }
        if (filterEmployees.chosenFilterDepartment != 'all'){
            filtered = filtered.filter(emp => emp.last_operation?.department.department_id == filterEmployees.chosenFilterDepartment)
        }
        if (filterEmployees.chosenFilterPosition != 'all'){
            filtered = filtered.filter(emp => emp.last_operation?.position.position_id == filterEmployees.chosenFilterPosition)
        }
        return filtered
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
    const departmentsListFilter = ref<Department[]>([])
    const departmentsList = ref<Department[]>([])
    const positionsList = ref<Position[]>([])
    const organizationsList = ref<Organization[]>([])
    
    const filterEmployees: FilterEmployees = reactive({
        chosenFilterOrganization: 'all',
        chosenFilterPosition: "all", 
        chosenFilterDepartment: "all"
    })

    async function refresh(){
        try{
            positionsList.value = await getAllPositions()
            if(editedEmployeeOrganizationId.value){
                departmentsList.value = await getAllForOrgFlat(editedEmployeeOrganizationId.value)
            }
            if (filterEmployees.chosenFilterOrganization != "all"){
                departmentsListFilter.value = await getAllForOrgFlat(filterEmployees.chosenFilterOrganization)
            }else{
                departmentsListFilter.value = await getAllDepartments()
            }
            employeesList.value = await getAllEmployees()
            operationsList.value = await getAllOperations()
            organizationsList.value = await getAllOrganizations()
                   
        }catch(err){
            console.error('cant load  page')
        }
    }
    onMounted(
        refresh
    )
    watch(filterEmployees, ()=>{
        refresh()
    })

</script>

<template>
    <div v-if="isPosOpen">
        <Positions
        :close="closePositions"/>
    </div>
    <div class="button-row">
        <router-link to="/hireEmployee" v-if="currentUser?.role == UserRoles.HR"><button>Нанять сотрудника</button></router-link>
        <button @click.prevent="isPosOpen = true">Должности</button>
    </div>
    

    <div class="table-grid table-employees">
        <div class="table-header">ФИО</div>
        <select class="filter-header" v-model="filterEmployees.chosenFilterOrganization">
            <option value="all">Все организации</option> 
            <option v-for="org in organizationsList"
            :key="org.organization_id"
            :value="org.organization_id"
            >{{ org.name }}</option>    
        </select>
        <select class="filter-header" v-model="filterEmployees.chosenFilterDepartment">
            <option value="all">Все отделы</option>
            <option v-for="dep in departmentsListFilter"
            :key="dep.department_id"
            :value="dep.department_id">{{ dep.name }}</option>
        </select>

        <select class="filter-header" v-model="filterEmployees.chosenFilterPosition">
            <option value="all" selected>Все должности</option>
            <option v-for="pos in positionsList"
            :key="pos.position_id"
            :value="pos.position_id">{{ pos.name }}</option>
        </select>

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