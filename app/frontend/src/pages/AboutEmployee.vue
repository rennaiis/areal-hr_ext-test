<script setup lang="ts">
import { getOneAdress } from '../API/adresses';
import { getOneEmployee } from '../API/employees';
import { getOnePassport } from '../API/passports';
import type { Adress, Employee, Passport } from '../interfaces';
import {onMounted, ref} from 'vue'

    const props = defineProps<{
        employeeId: string;
    }>()
    const id = +props.employeeId
    const currentEmployee = ref<Employee>()
    const currentPasspost = ref<Passport>()
    const currentAdress = ref<Adress>()
    
    async function refresh(){
        try{
            currentEmployee.value = await getOneEmployee(id)
            currentAdress.value = await getOneAdress(id)
            if (currentEmployee.value){
                currentPasspost.value = await getOnePassport(currentEmployee.value.passport_id)
            }
        }catch(err){
            console.error("cant load page")
        }
    }
    onMounted(
        refresh
    )

</script>
<template>
    <div class="block">
        <div class = "button-row">
            <h3>Фамилия:</h3>
            <p>{{ currentEmployee?.last_name }}</p>
        </div>
        <div class = "button-row">
            <h3>Имя:</h3>
            <p>{{currentEmployee?.first_name}}</p>
        </div>
        <div class = "button-row">
            <h3>Отчество:</h3>
            <p>{{currentEmployee?.middle_name}}</p>
        </div>
        <div class = "button-row">
            <h3>Дата рождения</h3>
            <p>{{currentEmployee?.birth_date}}</p>
        </div>
        <button>Редактировать</button>
    </div>

    <div class="block">
        <h2>Паспортные данные</h2>
        <div class = "button-row">
            <h3>Серия</h3>
            <p>{{currentPasspost?.series}}</p>
        </div>
        <div class = "button-row">
            <h3>Номер:</h3>
            <p>{{ currentPasspost?.number }}</p>
        </div>
        <div class = "button-row">
            <h3>Кем выдан:</h3>
            <p>{{currentPasspost?.issued_by}}</p>
        </div>
        <div class = "button-row">
            <h3>Дата выдачи:</h3>
            <p>{{currentPasspost?.issue_date}}</p>
        </div>
        <div class = "button-row">
            <h3>Код подразделения:</h3>
            <p>{{ currentPasspost?.department_code }}</p>
        </div>
        <button>Редактировать</button>
    </div>

    <div class="block">
        <h2>Адрес</h2>
        <div class = "button-row">
            <h3>Регион:</h3>
            <p>{{ currentAdress?.region }}</p>
        </div>
        <div class = "button-row">
            <h3>Населённый пункт:</h3>
            <p>{{ currentAdress?.settlement }}</p>
        </div>
        <div class = "button-row">
            <h3>Улица:</h3>
            <p>{{ currentAdress?.street }}</p>
        </div>
        <div class = "button-row">
            <h3>Дом:</h3>
            <p>{{currentAdress?.house}}</p>
        </div>
        <div class = "button-row">
            <h3>Квартира:</h3>
            <p>{{ currentAdress?.apartment }}</p>
        </div>
        <div class = "button-row">
            <h3>Корпус:</h3>
            <p>{{ currentAdress?.building }}</p>
        </div>
        <button>Редактировать</button>
    </div>
    

</template>