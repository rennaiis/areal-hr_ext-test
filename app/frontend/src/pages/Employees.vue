<script setup lang="ts">
    import {ref} from 'vue'
    import Positions from './Positions.vue';
    const isPosOpen = ref<boolean>(false)
    function closePositions(){
        isPosOpen.value = false
    }

</script>

<template>
    <div v-if="isPosOpen">
        <Positions
        :close="closePositions"/>
    </div>
    <div class="button-row">
        <button>Нанять сотрудника</button>
        <button @click.prevent="isPosOpen = true">Должности</button>
    </div>
    

    <div class="table-grid table-employees">
        <div class="table-header">ФИО</div>
        <div class="table-header">Организация</div>
        <div class="table-header">Отдел</div>
        <div class="table-header">Должность</div>
        <div class="table-header">Зарплата</div>
        <div class="table-header">Действия</div>
        

        <div class="table-item">Иван Иванов</div>
        <div class="table-item">ООО "Компания"</div>
        <div class="table-item">it</div>
        <div class="table-item">Программист</div>
        <div class="table-item">50 000 ₽</div>
        <div class="button-row table-item" >
            <button>Изменить</button>
            <button>Уволить</button>
        </div>
    </div>
    
    

</template>