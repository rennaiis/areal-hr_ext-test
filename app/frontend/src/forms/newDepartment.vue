<script setup lang="ts">
    import { ref } from 'vue';
    import type { Department } from '../interfaces';
    import { createDepartment } from '../API/departments';
    const props = defineProps<Omit<Department, 'department_id'>>()
    const emit = defineEmits(['close', 'refresh'])
    const form = ref({...props})
    async function addNewDepartment(){
        try{
            const payload: Omit<Department, 'department_id'> = {
                ...form.value,
                comment: form.value.comment?.trim() || undefined
            }
            await createDepartment(payload)
            emit('refresh')
            emit('close')
        }catch{
            console.error("cant create department")
        }
    }

</script>
<template>
    <div class="overlay">
        <form class="block" action="">
            <p>
                <label for="depName">Название</label>
                <input id="depName" type="text" v-model="form.name">
            </p>
            <p>
                <label for="depComment">Комментарий</label>
                <input id="depComment" type="text" v-model="form.comment">
            </p>
            <div class="button-row">
                <button @click.prevent="addNewDepartment">Добавить</button>
                <button @click.prevent="$emit('close')">Отмена</button>
            </div>
        </form>
    </div>
</template>