<script setup lang="ts">
    import { onMounted, ref, toRaw, watch } from 'vue';
    import { type Organization, type Department, type Position, type HireEmployee, type HrOperation, type Employee } from '../interfaces';
    import { getAllOrganizations } from '../API/organizations';
    import { getAllForOrgFlat } from '../API/departments';
    import { getAllPositions } from '../API/positions';
    import { hireEmployee } from '../API/employees';
    import { HrOperationType } from '../../../enums/HrOperationType';
    import { createOperation } from '../API/hr-operations';
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const organizationsList = ref<Organization[]>([])
    const departmentsList = ref<Department[]>([])
    const positionsList = ref<Position[]>([]) 
    const chosenOrganizationId = ref<number|null>(null)
    const step = ref<'add'|'hire'>('add')
    const selectedFiles = ref<File[]>([])
    function choseFiles(event: Event){
         const target  = event.target as HTMLInputElement
         if (target.files){
            selectedFiles.value = Array.from(target.files)
         }
    }
    const newOperation = ref<Omit<HrOperation, 'hr_operation_id'>>({
        employee_id: 0,
        department_id: 0,
        position_id: 0,
        salary: 0,      
        operation_type: HrOperationType.HIRE
    })
    const newEmployee = ref<HireEmployee>({
        employee: {
            last_name: '',
            first_name: '',
            middle_name: '',
            birth_date: ''
        }, 
        adress: {
            region: '',
            settlement: '',
            street: '',
            house: '',
            apartment: '',
            building: ''
        }, 
        passport: {
            series: '',
            number: '',
            issued_by: '',
            issue_date: '',
            department_code: ''
        }
    })
    async function hireNewEmployee() {
        try{
            await createOperation(newOperation.value)
            router.push('/employees')
        }catch(err){
            console.error('cant add hire operation')
        }        
    }
    async function addNewEmployee() {
        try{ 
            const payload: HireEmployee  = structuredClone(toRaw(newEmployee.value)) 
            payload.employee.birth_date = new Date(payload.employee.birth_date).toISOString().slice(0, 10)
            payload.passport.issue_date = new Date(payload.passport.issue_date).toISOString().slice(0, 10)
            const e: Employee= await hireEmployee(payload, selectedFiles.value)
            newOperation.value.employee_id = e.employee_id
            step.value = 'hire'
        }catch(err){
            console.error('cant hire employee ', err)
        }        
    }
    async function refresh(){
        try{
            organizationsList.value = await getAllOrganizations()
            positionsList.value = await getAllPositions()
            if (chosenOrganizationId.value){
                departmentsList.value = await getAllForOrgFlat(chosenOrganizationId.value)
            }
        }catch(err){
            console.error("cant get lists")
        }
    }
    onMounted(
        refresh
    )
    watch(chosenOrganizationId, 
        refresh
    )
</script>

<template>
    <template v-if="step === 'add'">
        <h2>Введите персональные данные сотрудника</h2>
        <form  class="block" @submit.prevent="addNewEmployee">
        <label for="last_name">Фамилия:</label>
        <input type="text" id="last_name" maxlength="100" required v-model="newEmployee.employee.last_name">

        <label for="first_name">Имя:</label>
        <input type="text" id="first_name" maxlength="100" required v-model="newEmployee.employee.first_name">

        <label for="middle_name">Отчество:</label>
        <input type="text" id="middle_name" maxlength="100" v-model="newEmployee.employee.middle_name">

        <label for="birth_date">Дата рождения:</label>
        <input type="date" id="birth_date" required v-model="newEmployee.employee.birth_date">

        <h2>Паспортные данные:</h2>
        <label for="series">Серия:</label>
        <input id="series" maxlength="4" type="text" pattern="\d{4}" required v-model="newEmployee.passport.series">

        <label for="number">Номер:</label>
        <input id="number" maxlength="6" inputmode="numeric"  type="text" pattern="\d{6}" required v-model="newEmployee.passport.number">

        <label for="issued_by">Кем выдан:</label>
        <input  type="text"  id="issued_by" maxlength="500" required v-model="newEmployee.passport.issued_by"></input>

        <label for="issue_date">Дата выдачи:</label>
        <input id="issue_date" type="date" required v-model="newEmployee.passport.issue_date">

        <label for="department_code">Код подразделения:</label>
        <input id="department_code" type="text" pattern="\d{3}-\d{3}" maxlength="7" placeholder="000-000" required v-model="newEmployee.passport.department_code">

        <label for="scans">Сканы паспорта</label>
        <input type="file" @change="choseFiles" multiple>
        <h2>Адрес:</h2>
        <label for="region">Регион:</label>
        <input type="text" id="region" maxlength="150" required v-model="newEmployee.adress.region">

        <label for="settlement">Населенный пункт:</label>
        <input type="text" id="settlement" maxlength="150" required v-model="newEmployee.adress.settlement">

        <label for="street">Улица:</label>
        <input type="text" id="street" maxlength="150" required v-model="newEmployee.adress.street">

        <label for="house">Дом:</label>
        <input type="text" id="house" maxlength="15" required v-model="newEmployee.adress.house">

        <label for="apartment">Квартира:</label>
        <input type="text" id="apartment" maxlength="15" v-model="newEmployee.adress.apartment">

        <label for="building">Корпус:</label>
        <input type="text" id="building" maxlength="15" v-model="newEmployee.adress.building">
        <button>Далее</button>
        </form>
    </template>
    
    <template v-if="step=='hire'">   
        <h2>Введите данные о работе сотрудника</h2>
        <form class="block" @submit.prevent="hireNewEmployee">
            <label for="organization_id">Организация:</label>
            <select v-model="chosenOrganizationId" id="organization_id" name="organization_id" required>
                <option value="" disabled selected>Выберите организацию</option>
                <option 
                v-for="org in organizationsList"
                :key="org.organization_id"
                :value="org.organization_id">{{ org.name }}</option>
            </select>

            <label for="department_id">Отдел:</label>
            <select v-model="newOperation.department_id" id="department_id" name="department_id" required>
                <option value="" disabled>Выберите отдел</option>
                <option 
                    v-for="dep in departmentsList"
                    :key="dep.department_id"
                    :value="dep.department_id"
                >{{ dep.name }}</option>
            </select>
            <label  for="position_id">Должность:</label>
            <select v-model="newOperation.position_id" id="position_id" name="position_id" required>
                <option value="" disabled>Выберите должность</option>
                <option 
                v-for="pos in positionsList"
                :key="pos.position_id"
                :value="pos.position_id"
                >{{ pos.name }}</option>
            </select>
    
            <label for="salary">Зарплата:</label>
            <input v-model="newOperation.salary" type="number" id="salary" required>
            <button>Нанять</button>
        </form>
    </template>
        
</template>