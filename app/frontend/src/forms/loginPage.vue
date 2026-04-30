<script setup lang="ts">
    import { ref } from 'vue'
    import { getMe, login } from '../API/auth';
import router from '../router';
import { currentUser } from '../currentUser';
    const currentLogin = ref<string>('')
    const currentPassword = ref<string>('')

    async function loginToSystem() {
        try{
            await login(currentLogin.value, currentPassword.value)
            router.push('/')
            currentUser.value = await getMe()
        }catch(e){
            console.log(e);
        }
    }
</script>
<template>
    <div class="overlay">
        <form class="block" @submit.prevent="loginToSystem">
            <p>
                <label for="depName">Логин</label>
                <input id="depName" type="text" maxlength="150" required v-model="currentLogin">
            </p>
            <p>
                <label for="depComment">Пароль</label>
                <input type="password" id="depComment" minlength="8" v-model="currentPassword" required></input>
            </p>
            <div class="button-row">
                <button type="submit">Войти</button>
            </div>
        </form>
    </div>
</template>