<script setup lang="ts">
    import { ref } from 'vue';
    import NewDepartment from '../forms/newDepartment.vue';
    const isDepsOpen = ref(false)
    function change():void{
        isDepsOpen.value = !isDepsOpen.value
    }
    const addDepForm = ref(false)

</script>
<template>
    <div class = "block">
        <div class = "org-header">
            <h3>Название организации</h3>
            <h2 v-if="!isDepsOpen" @click="change">∨</h2>
            <h2 v-if="isDepsOpen" @click="change">∧</h2>
        </div>
        <p>Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий
            Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий 
            Комментарий Комментарий Комментарий Комментарий КомментарийКомментарий
        </p>
        <div class="button-row">
            <button>Редактировать</button>
            <button>Удалить</button>
        </div>
        <div v-if="isDepsOpen">
            <h3>Отделы</h3>
            <ul>
                <li class="button-row">
                    <h4>Отдел1</h4>
                    <img src='../assets/add.png' class="icon" @click="addDepForm = true">
                    <img src="../assets/delete.png" class="icon">
                    <img src="../assets/edit.png" class="icon">
                </li>
                <p>КомментарийКомментарий</p>
                <li class="button-row">
                    <h4>Отдел2</h4>
                    <img src='../assets/add.png' class="icon">
                    <img src="../assets/delete.png" class="icon">
                    <img src="../assets/edit.png" class="icon">
                </li>
                <ul>
                    <li class="button-row">
                        <h4>подотдел1</h4>
                        <img src='../assets/add.png' class="icon">
                        <img src="../assets/delete.png" class="icon">
                        <img src="../assets/edit.png" class="icon">
                    </li>
                    <p>КомментарийКомментарий Комментарий Комментарий</p>
                    <li class="button-row">
                        <h4>подотдел2</h4>
                        <img src='../assets/add.png' class="icon">
                        <img src="../assets/delete.png" class="icon">
                        <img src="../assets/edit.png" class="icon">
                    </li>
                </ul>
            </ul>
        </div>  
    </div>
    
    <form action="" >
        <div class="form-item">
            <label for="org-name">Название организации</label>
            <input class="window-input" id="org-name" type="text">
        </div>
        <div class="form-item">
            <label for="org-comment">Комментарий</label>
            <input class="window-input" id="org-comment" type="text">
        </div>
        <button>Добавить организацию</button>
    </form>

    <div v-if="addDepForm">
        <NewDepartment></NewDepartment>
    </div>
</template>