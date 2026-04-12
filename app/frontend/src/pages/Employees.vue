<script setup lang="ts">
</script>

<template>
    <div class="button-row">
        <button>Нанять сотрудника</button>
        <button>Организации и отделы</button>
        <button>Должности</button>
    </div>
    

    <div class="table-grid">
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