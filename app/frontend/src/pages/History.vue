<script setup lang="ts">
    import { getAllHistory } from '../API/history';
    import type { HistoryItem } from '../interfaces';
    import {onMounted, ref} from 'vue'
    const historyList = ref<HistoryItem[]>([])
    async function refresh(){
        try{
            historyList.value = await getAllHistory()
            historyList.value = historyList.value.reverse()
        }catch(err){
            console.error("cant load history")
        }
    }
    onMounted(
        refresh
    )

</script>

<template>
    <h3>История изменений</h3>
    <div class="table-grid table-history">
        <div class="table-header">id элемента</div>
        <div class="table-header">Таблица</div>
        <div class="table-header">Поле</div>
        <div class="table-header">Старое значение</div>
        <div class="table-header">Новое значение</div>
        <div class="table-header">Дата</div>
        <template v-for="item in historyList">
            <div class="table-item">{{ item.target_id }}</div>
            <div class="table-item">{{ item.operation_object }}</div>
            <div class="table-item">{{item.field_name}}</div>
            <div class="table-item">{{item.old_value}}</div>
            <div class="table-item">{{ item.new_value }}</div>
            <div class="table-item">{{ item.created_at }}</div>

        </template>
    </div>
</template>