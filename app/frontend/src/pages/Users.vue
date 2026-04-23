<script setup lang="ts">
    import { UserRoles } from '../../../enums/UserRoles';
    import { getAllEmployees } from '../API/employees';
    import { createUser, getAllUsers, removeUser, updateUser } from '../API/users';
    import { type editUser, type Employee, type User } from '../interfaces';
    import {onMounted, ref} from 'vue'
    const usersList = ref<User[]>([])
    const employeesList = ref<Employee[]>([])
    const newUser = ref<Omit<User, 'user_id'>>({
        employee_id: undefined,
        last_name: '',
        first_name: '',
        middle_name: '',
        login: '',
        password_hash: '',
        role: undefined
    })
    const editedUserId = ref<number>()
    const editedUser = ref<editUser>({
        login: '',
        password_hash: '',
        role: undefined
    })
    
    function choseUserToEdit(user: User) {
        console.log(user);
        editedUserId.value = user.user_id
        editedUser.value.login = user.login
        editedUser.value.password_hash = user.password_hash
        editedUser.value.role = user.role
        
    }

    function choseEmployee() {
        const emp = employeesList.value.find(e => e.employee_id === newUser.value.employee_id);
        if (emp) {
            newUser.value.first_name = emp.first_name;
            newUser.value.last_name = emp.last_name;
            if (emp.middle_name ){
                 newUser.value.middle_name = emp.middle_name
            }
        }
    }
    async function deleteUser(id: number){
        try{
            await removeUser(id)
            refresh()
        }catch(err){
            console.error(err)
        }
    }

    async function addNewUser(){
        try{
            await createUser(newUser.value)
            refresh()
        }catch(err){
            console.error(err)
        }
    }

    async function editUser() {
        try{
            console.log(editedUser.value);
            if(editedUserId.value){
                await updateUser(editedUser.value, editedUserId.value)
                editedUserId.value = undefined
                refresh()
            }
        }catch(err){
            console.log(err);
        }
    }

    async function refresh(){
        try{
            employeesList.value = await getAllEmployees()
            usersList.value = await getAllUsers()
        }catch(err){
            console.error("cant load users")
        }
    }
    onMounted(
        refresh
    )
    
    

</script>
<template>
    <form class="form-inline" @submit.prevent="addNewUser">
        <div class="form-item">
            <label for="emp">Сотрудник</label>
            <select 
            class="window-input" 
            id="emp" 
            v-model="newUser.employee_id" 
            @change="choseEmployee">
                <option value="" disabled selected>Сотрудник</option>
                <option 
                v-for="emp in employeesList"
                :key="emp.employee_id"
                :value="emp.employee_id">
                {{ emp.first_name }} {{ emp.last_name }}
                </option>
            </select>
        </div>
        <div class="form-item">
            <label for="name">Имя</label>
            <input class="window-input" id="name" type="text" v-model="newUser.first_name" maxlength="100" required>
        </div>
        <div class="form-item">
            <label for="lastname">Фамилия</label>
            <input class="window-input" id="lastname" type="text" v-model="newUser.last_name" maxlength="100" required>
        </div>
        <div class="form-item">
            <label for="middlename">Отчество</label>
            <input class="window-input" id="middlename" type="text" v-model="newUser.middle_name" maxlength="100" required>
        </div>
         <div class="form-item">
            <label for="login">Логин</label>
            <input class="window-input" id="login" type="text" v-model="newUser.login" maxlength="100" required>
        </div>
        <div class="form-item">
            <label for="role">Роль</label>
            <select class="window-input" id="role" v-model="newUser.role">
                <option value="" disabled selected>Роль</option>
                <option :value="UserRoles.ADMIN">Администратор</option>
                <option :value="UserRoles.HR">Hr-менеджер</option>
            </select>
        </div>
        <div class="form-item">
            <label for="pass">Пароль</label>
            <input class="window-input" id="pass" type="password" v-model="newUser.password_hash" minlength="8" required>
        </div>

        <button>Добавить</button>
    </form>

    <div class="table-grid table-users">
        <div class="table-header">ФИО</div>
        <div class="table-header">Роль</div>
        <div class="table-header">Пароль</div>
        <div class="table-header">Логин</div>
        <div class="table-header">Действия</div>
        
        <template v-for="user in usersList">
            <form style="display: none;" :id="'edit-form-' + user.user_id" @submit.prevent="editUser"></form>
            <template v-if="editedUserId !== user.user_id">
                <div class="table-item">{{ user.first_name }} {{ user.last_name }} {{ user.middle_name }}</div>
                <div class="table-item">{{user.login}}</div>
                <div class="table-item">{{user.password_hash}}</div>
                <div class="table-item">{{ user.role }}</div>
                <div class="table-item button-row">
                    <button @click.prevent="choseUserToEdit(user)">Изменить</button>
                    <button @click.prevent="deleteUser(user.user_id)">Удалить</button>
                </div>
            </template>
        
            <template  v-if="editedUserId === user.user_id" >
                <div class="table-item">{{ user.first_name }} {{ user.last_name }} {{ user.middle_name }}</div>
                <div class="table-item">
                    <select :form="'edit-form-' + user.user_id" v-model="editedUser.role">
                        <option value="" disabled selected>Роль</option>
                        <option :value="UserRoles.ADMIN">Администратор</option>
                        <option :value="UserRoles.HR">Hr-менеджер</option>
                    </select>
                </div>
                <div class="table-item">
                    <input :form="'edit-form-' + user.user_id" type="password" v-model="editedUser.password_hash" minlength="8" required>
                </div>
                <div class="table-item">
                    <input :form="'edit-form-' + user.user_id" type="text" v-model="editedUser.login" maxlength="100" required>
                </div>
                <div class="table-item button-row">
                    <button type="submit" :form="'edit-form-' + user.user_id">ОК</button>
                </div>
            </template>
            
        </template>
    </div>
</template>