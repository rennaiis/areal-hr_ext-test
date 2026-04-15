<script setup lang="ts">
</script>
<template>
    <div class="overlay">
        <form class="block" action="">
            <p>
                <label for="depName">Название</label>
                <input id="depName" type="text">
            </p>
            <p>
                <label for="depComment">Комментарий</label>
                <input id="depComment" type="text">
            </p>
            <div class="button-row">
                <button>Добавить</button>
                <button>Отмена</button>
            </div>
        </form>
    </div>
</template>