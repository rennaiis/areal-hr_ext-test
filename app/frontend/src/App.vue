<script setup lang="ts">
    import { onMounted } from 'vue';
    import Header from './Header.vue';
    import { currentUser } from './currentUser';
    import { getMe, logout } from './API/auth';
import router from './router';
    async function getUser() {
        currentUser.value = await getMe()
    }
    async function logoutFromSystem() {
        await logout()
        currentUser.value = null
        router.push('/login')
    }
    onMounted(
        getUser
    )
</script>

<template>
    <Header></Header>
    <main>
        <RouterView></RouterView>
    </main>
    <button @click="logoutFromSystem">Выйти</button>


</template>

<style scoped>
</style>
