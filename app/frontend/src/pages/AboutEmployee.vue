<script setup lang="ts">
import { getOneAdress } from '../API/adresses';
import { getOneEmployee } from '../API/employees';
import { getOnePassport } from '../API/passports';
import type { Adress, Employee, Passport } from '../interfaces';
import {ref} from 'vue'

    const props = defineProps<{
        employeeId: number;
    }>()
    const currentEmployee = ref<Employee>()
    const currentPasspost = ref<Passport>()
    const currentAdress = ref<Adress>()
    
    async function refresh(){
        try{
            currentEmployee.value = await getOneEmployee(props.employeeId)
            currentAdress.value = await getOneAdress(props.employeeId)
            if (currentEmployee.value){
                currentPasspost.value = await getOnePassport(currentEmployee.value.passport_id)
            }
        }catch(err){
            console.error("cant load page")
        }
    }

</script>
<template>
    <div class="block">
        <div class = "button-row">
            <h3>Фамилия:</h3>
            <p>Иванов</p>
        </div>
        <div class = "button-row">
            <h3>Имя::</h3>
            <p>Иван</p>
        </div>
        <div class = "button-row">
            <h3>Отчество:</h3>
            <p>Иванович</p>
        </div>
        <div class = "button-row">
            <h3>Дата рождения</h3>
            <p>{{ new Date().getDay()}}.{{ new Date().getMonth() }}.{{ new Date().getFullYear() }}</p>
        </div>
        <button>Редактировать</button>
    </div>

    <div class="block">
        <h2>Паспортные данные</h2>
        <div class = "button-row">
            <h3>Серия</h3>
            <p>1234</p>
        </div>
        <div class = "button-row">
            <h3>Номер:</h3>
            <p>123456</p>
        </div>
        <div class = "button-row">
            <h3>Кем выдан:</h3>
            <p>лыовлдоыфдловчшщкобыщвшзьсеаовклцщуыбдвчьстапекрошущцлзы</p>
        </div>
        <div class = "button-row">
            <h3>Дата выдачи:</h3>
            <p>{{ new Date().getDay()}}.{{ new Date().getMonth() }}.{{ new Date().getFullYear() }}</p>
        </div>
        <div class = "button-row">
            <h3>Код подразделения:</h3>
            <p>123-282</p>
        </div>
        <button>Редактировать</button>
    </div>

    <div class="block">
        <h2>Адрес</h2>
        <div class = "button-row">
            <h3>Регион:</h3>
            <p>Ярославская область</p>
        </div>
        <div class = "button-row">
            <h3>Населённый пункт:</h3>
            <p>город Ярославль</p>
        </div>
        <div class = "button-row">
            <h3>Улица:</h3>
            <p>Первомайская</p>
        </div>
        <div class = "button-row">
            <h3>Дом:</h3>
            <p>34</p>
        </div>
        <div class = "button-row">
            <h3>Квартира:</h3>
            <p>34</p>
        </div>
        <div class = "button-row">
            <h3>Корпус:</h3>
            <p>5</p>
        </div>
        <button>Редактировать</button>
    </div>
    

</template>