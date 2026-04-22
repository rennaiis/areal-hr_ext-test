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
        <form class="block" @submit.prevent="addNewDepartment">
            <p>
                <label for="depName">Название</label>
                <input id="depName" type="text" v-model="form.name" maxlength="150" required>
            </p>
            <p>
                <label for="depComment">Комментарий</label>
                <textarea  id="depComment"  v-model="form.comment" maxlength="1000"></textarea>
            </p>
            <div class="button-row">
                <button type="submit">Добавить</button>
                <button @click.prevent="$emit('close')" type="button">Отмена</button>
            </div>
        </form>
    </div>
</template>