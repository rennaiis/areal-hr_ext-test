<script setup lang="ts">
import { getOneAdress, updateAdress } from '../API/adresses';
import { getOneEmployee, updateEmployee } from '../API/employees';
import { createFiles, removeFile } from '../API/files';
import { getOnePassport, updatePassport } from '../API/passports';
import type { Adress, Employee, fullPassport, Passport } from '../interfaces';
import {onMounted, ref} from 'vue'
    const picUrl = "http://localhost:3000/passportFiles/"
    const props = defineProps<{
        employeeId: string;
    }>()
    const id = +props.employeeId

    const currentEmployee = ref<Employee>()
    const currentPasspost = ref<fullPassport>()
    const currentAdress = ref<Adress>()
    const isEdited = ref<'info'|'adress'|'passport'|null>(null)
    
    const editedEmployee = ref<Omit<Employee, 'employee_id'|'passport_id'>>({
        last_name: currentEmployee.value ? currentEmployee.value.last_name : '', 
        first_name: currentEmployee.value ? currentEmployee.value.first_name : '', 
        middle_name:currentEmployee.value ? currentEmployee.value.middle_name : '', 
        birth_date: currentEmployee.value ? currentEmployee.value.birth_date : '',
    })
    const editedAdress = ref<Omit<Adress, 'adress_id'>>({
        region: currentAdress.value ? currentAdress.value.region : '',
        settlement: currentAdress.value ? currentAdress.value.settlement : '',
        street: currentAdress.value ? currentAdress.value.street : '',
        house: currentAdress.value ? currentAdress.value.house : '',
        apartment: currentAdress.value  ? currentAdress.value.apartment : '',
        building: currentAdress.value ? currentAdress.value.building : '',
    })
    const editedPassport = ref<Omit<Passport, 'passport_id'>>({
        series: currentPasspost.value ? currentPasspost.value.series : '',
        number: currentPasspost.value ? currentPasspost.value.number : '',
        issued_by: currentPasspost.value ? currentPasspost.value.issued_by : '',
        issue_date: currentPasspost.value ? currentPasspost.value.issue_date : '',
        department_code: currentPasspost.value ? currentPasspost.value.department_code : ''
    })

    async function editAdress() {
        try{
            if (!currentAdress.value){
                throw new Error()
            }
            if (editedAdress.value){
                await updateAdress(editedAdress.value, currentAdress.value.adress_id)
                await refresh()
                isEdited.value = null
            }
        }catch(err){
            console.error('cant edit adress')
        }
    }
    async function editPassport() {
        try{
            if (!currentPasspost.value) {
                    throw new Error()
            }
            if (editedPassport.value){
                await updatePassport(editedPassport.value, currentPasspost.value?.passport_id)
                await refresh()
                isEdited.value = null
            }
        }catch(err){
            console.error('cant edit passport')
        }
    }

    async function editEmployee() {
        try{
            if (editedEmployee.value){
                if (!currentPasspost.value) {
                    throw new Error()
                }
                const payload: Omit<Employee, 'employee_id'> = {
                    ...editedEmployee.value, 
                    passport_id: currentPasspost.value?.passport_id,
                    middle_name: currentEmployee.value?.middle_name?.trim() || undefined
                }
                await updateEmployee(payload, id)
                isEdited.value = null
                await refresh()
            }
        }catch(err){
            console.error('cant edit employee')
        }
    }
    async function deleteFile(id: number) {
        try{
            await removeFile(id)
            refresh()
        }catch(err){
            console.error(err)
        }
    }
    const selectedFiles = ref<File[]>([])
    function choseFiles(event: Event){
         const target  = event.target as HTMLInputElement
         if (target.files){
            selectedFiles.value = Array.from(target.files)
         }
    }
    async function addFiles() {
        try{
            if (currentPasspost.value)
                await createFiles(currentPasspost.value?.passport_id, selectedFiles.value)
                refresh()
        }catch(err){
            console.error(err)
        }
    }
    async function refresh(){
        try{
            currentEmployee.value = await getOneEmployee(id)
            currentAdress.value = await getOneAdress(id)
            if (currentEmployee.value){
                currentPasspost.value = await getOnePassport(currentEmployee.value.passport_id)
            }
            editedEmployee.value = {
                last_name: currentEmployee.value ? currentEmployee.value.last_name : '', 
                first_name: currentEmployee.value ? currentEmployee.value.first_name : '', 
                middle_name:currentEmployee.value ? currentEmployee.value.middle_name : '', 
                birth_date: currentEmployee.value ? currentEmployee.value.birth_date : '',
            }
            editedAdress.value = {
                region: currentAdress.value ? currentAdress.value.region : '',
                settlement: currentAdress.value ? currentAdress.value.settlement : '',
                street: currentAdress.value ? currentAdress.value.street : '',
                house: currentAdress.value ? currentAdress.value.house : '',
                apartment: currentAdress.value  ? currentAdress.value.apartment : '',
                building: currentAdress.value ? currentAdress.value.building : ''
            }
            editedPassport.value = {
                series: currentPasspost.value ? currentPasspost.value.series : '',
                number: currentPasspost.value ? currentPasspost.value.number : '',
                issued_by: currentPasspost.value ? currentPasspost.value.issued_by : '',
                issue_date: currentPasspost.value ? currentPasspost.value.issue_date : '',
                department_code: currentPasspost.value ? currentPasspost.value.department_code : ''
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
    <form  class="block" v-if="isEdited == 'info'" @submit.prevent="editEmployee">
        <label for="last_name">Фамилия:</label>
        <input type="text" id="last_name" maxlength="100" required v-model="editedEmployee.last_name">

        <label for="first_name">Имя:</label>
        <input type="text" id="first_name" maxlength="100" required v-model="editedEmployee.first_name">

        <label for="middle_name">Отчество:</label>
        <input type="text" id="middle_name" maxlength="100" v-model="editedEmployee.middle_name">

        <label for="birth_date">Дата рождения:</label>
        <input type="date" id="birth_date" required v-model="editedEmployee.birth_date">
        <button>Сохранить</button>
    </form>

    <div class="block" v-if="isEdited != 'info'">
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
        <button @click="isEdited='info'">Редактировать</button>
    </div>

    <form  class="block" v-if="isEdited == 'passport'" @submit.prevent="editPassport">
        <h2>Паспортные данные</h2>
        <label for="series">Серия:</label>
        <input id="series" maxlength="4" type="text" pattern="\d{4}" required v-model="editedPassport.series">

        <label for="number">Номер:</label>
        <input id="number" maxlength="6" inputmode="numeric"  type="text" pattern="\d{6}" required v-model="editedPassport.number">

        <label for="issued_by">Кем выдан:</label>
        <input  type="text"  id="issued_by" maxlength="500" required v-model="editedPassport.issued_by"></input>

        <label for="issue_date">Дата выдачи:</label>
        <input id="issue_date" type="date" required v-model="editedPassport.issue_date">

        <label for="department_code">Код подразделения:</label>
        <input id="department_code" type="text" pattern="\d{3}-\d{3}" maxlength="7" placeholder="000-000" required v-model="editedPassport.department_code">
        <button>Сохранить</button>
    </form>

    <div class="block" v-if="isEdited != 'passport'">
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
        <h3>Сканы паспорта</h3>
        <div class = "passport-imgs" v-for="file in currentPasspost?.files">
            <a :href="picUrl + file.file_path"><img :src="picUrl + file.file_path" class="passport-img" alt="паспорт"></a>
            <img src="../assets/delete.png" class="icon" @click="deleteFile(file.file_id)">
        </div> 
        <div class="button-row">
            <input type="file" @change="choseFiles" multiple>
            <button @click="addFiles">Добавить</button>
        </div>
        
        <button @click="isEdited = 'passport'">Редактировать</button>
    </div>

    <form class="block" v-if="isEdited == 'adress'" @submit="editAdress">
        <h2>Адрес</h2>
        <label for="region">Регион:</label>
        <input type="text" id="region" maxlength="150" required v-model="editedAdress.region">

        <label for="settlement">Населенный пункт:</label>
        <input type="text" id="settlement" maxlength="150" required v-model="editedAdress.region">

        <label for="street">Улица:</label>
        <input type="text" id="street" maxlength="150" required v-model="editedAdress.street">

        <label for="house">Дом:</label>
        <input type="text" id="house" maxlength="15" required v-model="editedAdress.house">

        <label for="apartment">Квартира:</label>
        <input type="text" id="apartment" maxlength="15" v-model="editedAdress.apartment">

        <label for="building">Корпус:</label>
        <input type="text" id="building" maxlength="15" v-model="editedAdress.building">
        <button>Сохранить</button>
    </form>

    <div class="block" v-if="isEdited != 'adress'" >
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
        <button @click="isEdited='adress'">Редактировать</button>
    </div>

    

</template>