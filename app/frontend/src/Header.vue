<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { currentUser } from './currentUser';
    import { UserRoles } from '../../enums/UserRoles';
    const isOpen = ref<boolean>(false)
    const route = useRoute()
    const pageTitle = computed(()=>{
        return route.meta.title || "HR-система"
    })

</script>

<template>
    <div class="header">
        <div class="header-line">
            <h1>{{ pageTitle }}</h1>
            <button v-if="isOpen" @click="isOpen = false" class="burgerButton">✕</button>
            <button v-if="!isOpen" @click="isOpen = true" class="burgerButton">☰</button>
        </div>
        
        <nav :class="['nav-panel', {'active-panel':isOpen}]">
            <router-link to="/" class="nav-item">Сотрудники</router-link>
            <router-link to="/organizations" class="nav-item">Организации и отделы</router-link>
            <router-link to="/hr-operations" class="nav-item">Кадровые операции</router-link>
            <router-link to="/history" class="nav-item">История операций</router-link>
            <router-link to="/users" class="nav-item" v-if="currentUser?.role == UserRoles.ADMIN">Пользователи</router-link>
            
        </nav>
    </div>
</template>