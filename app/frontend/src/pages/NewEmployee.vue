<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import type { Adress, Employee, Passport, Organization, Department, Position } from '../interfaces';
    import { getAllOrganizations } from '../API/organizations';
    import { getAllforOrganization, getAllForOrgFlat } from '../API/departments';
    import { getAllPositions } from '../API/positions';

    const organizationsList = ref<Organization[]>([])
    const departmentsList = ref<Department[]>([])
    const positionsList = ref<Position[]>([]) 
    const chosenOrganizationId = ref<number|null>(null)
    const chosenPositionId = ref<number|null>(null)
    const chosenDepartmentId = ref<number|null>(null)
    const newEmployee = ref<Omit<Employee, 'employee_id'>>({
        last_name: '', 
        first_name: '', 
        middle_name:'', 
        birth_date: new Date(),
        passport_id: 0
    })
    const newAdress = ref<Omit<Adress, 'adress_id'>>({
        region: '',
        settlement: '',
        street: '',
        house: '',
        apartment: '',
        building: '',
    })
    const newPassport = ref<Omit<Passport, 'passport_id'>>({
        series: '',
        number: '',
        issued_by: '',
        issue_date: new Date(),
        department_code: ''
    })
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

        <h2>Введите данные о сотруднике</h2>
        <form action="" class="block">
            <label for="last_name">Фамилия:</label>
            <input type="text" id="last_name" maxlength="100" required>

            <label for="first_name">Имя:</label>
            <input type="text" id="first_name" maxlength="100" required>

            <label for="middle_name">Отчество:</label>
            <input type="text" id="middle_name" maxlength="100">

            <label for="birth_date">Дата рождения:</label>
            <input type="date" id="birth_date" required>
            <button>Далее</button>
        </form>

        <h2>Введите паспортные данные сотрудника:</h2>
            <form action="" class="block">
            <label for="series">Серия:</label>
            <input id="series" maxlength="4" type="text" pattern="\d{4}" required>

            <label for="number">Номер:</label>
            <input id="number" maxlength="6" inputmode="numeric"  type="text" pattern="\d{6}" required>

            <label for="issued_by">Кем выдан:</label>
            <input  type="text"  id="issued_by" maxlength="500" required></input>

            <label for="issue_date">Дата выдачи:</label>
            <input id="issue_date" type="date" required>

            <label for="department_code">Код подразделения:</label>
            <input id="department_code" type="text" pattern="\d{3}-\d{3}" maxlength="7" placeholder="000-000" required>
            <button>Далее</button>
        </form>

        <h2>Введите адрес сотрудника:</h2>
            <form action="" class="block">
                <label for="region">Регион:</label>
                <input type="text" id="region" maxlength="150" required>

                <label for="settlement">Населенный пункт:</label>
                <input type="text" id="settlement" maxlength="150" required>

                <label for="street">Улица:</label>
                <input type="text" id="street" maxlength="150" required>

                <label for="house">Дом:</label>
                <input type="text" id="house" maxlength="15" required>

                <label for="apartment">Квартира:</label>
                <input type="text" id="apartment" maxlength="15">

                <label for="building">Корпус:</label>
                <input type="text" id="building" maxlength="15">
                <button>Далее</button>
            </form>
        
        <h2>Введите остальные данные</h2>
            <form action="" class="block">
                <label for="organization_id">Организация:</label>
                <select v-model="chosenOrganizationId" id="organization_id" name="organization_id" required>
                    <option value="" disabled selected>Выберите организацию</option>
                    <option 
                    v-for="org in organizationsList"
                    :key="org.organization_id"
                    :value="org.organization_id">{{ org.name }}</option>
                </select>

                <label for="department_id">Отдел:</label>
                <select id="department_id" name="department_id" required>
                    <option value="" disabled selected>Выберите отдел</option>
                    <option 
                        v-for="dep in departmentsList"
                        :key="dep.department_id"
                        :value="dep.department_id"
                    >{{ dep.name }}</option>
                </select>
                <label for="position_id">Должность:</label>
                <select id="position_id" name="position_id" required>
                    <option value="" disabled selected>Выберите должность</option>
                    <option 
                    v-for="pos in positionsList"
                    :key="pos.position_id"
                    :value="pos.position_id"
                    >{{ pos.name }}</option>
                </select>
                

                <label for="salary">Зарплата:</label>
                <input type="number" id="salary"  required>
                <button>Далее</button>
            </form>
        
        
    
</template>