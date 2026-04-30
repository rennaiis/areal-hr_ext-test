<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { currentUser } from './currentUser';
import { UserRoles } from '../../enums/UserRoles';

    const route = useRoute()
    const pageTitle = computed(()=>{
        return route.meta.title || "HR-система"
    })

</script>

<template>
    <div class="header">
        <h1>{{ pageTitle }}</h1>
        <nav class="nav-panel">
            <router-link to="/" class="nav-item">Сотрудники</router-link>
            <router-link to="/organizations" class="nav-item">Организации и отделы</router-link>
            <router-link to="/hr-operations" class="nav-item">Кадровые операции</router-link>
            <router-link to="/history" class="nav-item">История операций</router-link>
            
            <router-link to="/users" class="nav-item" v-if="currentUser?.role == UserRoles.ADMIN">Пользователи</router-link>
        </nav>
    </div>
</template>