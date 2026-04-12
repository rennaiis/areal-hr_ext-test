<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

    const route = useRoute()
    const pageTitle = computed(()=>{
        return route.meta.title || "HR-система"
    })

</script>

<template>
    <div class="header">
        <h1>{{ pageTitle }}</h1>
        <nav class="nav-panel">
            <router-link to="/employees" class="nav-item">Сотрудники</router-link>
            <router-link to="/history" class="nav-item">История операций</router-link>
        </nav>
    </div>
</template>