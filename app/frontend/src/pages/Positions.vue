<script setup lang="ts">
    import { createPosition, getAllPositions, removePosition, updatePosition } from '../API/positions';
    import type { Position } from '../interfaces';
    import {onMounted, ref} from 'vue'
    const positionsList = ref<Position[]>([])
    const props=defineProps<{
        close: ()=>void
    }>()
    const newPosition = ref<Omit<Position, 'position_id'>>({
        name: '',
    })
    const editedPosition = ref<Omit<Position, 'position_id'>>({
        name: '',
    })
    function choseEditPosition(pos: Position){
        editedPositionId.value = pos.position_id
        editedPosition.value.name = pos.name
    }
    
    async function editPosition() {
        try{
            if (editedPositionId.value){
                await updatePosition(editedPosition.value, editedPositionId.value)
                editedPositionId.value = null
                await refresh()
            }
        }catch(err){
            console.error('cant edit positions')
        }
        
    }
    const editedPositionId = ref<number|null>(null)
    async function addPosition() {
        try{
            await createPosition(newPosition.value)
            newPosition.value = {
                name: '',
            };
            await refresh()
        }catch(err){
            console.error('cant get positions')
        }
    }

    async function deletePosition(id: number) {
        try{
            await removePosition(id)
        }catch(err){
            console.error('cant delete position')
        }
        refresh()
    }
    async function refresh() {
        try{
            positionsList.value = await getAllPositions()
        }catch(err){
            console.error("cant load positions")
        }
    }
    onMounted(
        refresh 
    )
</script>
<template>
    <div class="overlay">
        <div class="block modal">
            <h3>Должности</h3>
            <template v-for="pos in positionsList">
                <div v-if="editedPositionId !== pos.position_id" class='button-row'>
                    <h4>{{pos.name}}</h4>
                    <img src="../assets/delete.png" class="icon" @click="deletePosition(pos.position_id)">
                    <img @click="choseEditPosition(pos)" src="../assets/edit.png" class="icon">
                </div>
                <form v-if="editedPositionId === pos.position_id">
                    <input type="text" v-model="editedPosition.name">
                    <button @click.prevent="editPosition">Подтвердить</button>
                </form>
            </template>
               
            <form action="" class='button-row'>
                <label for="newPositionName">Название</label>
                <input type="text" id="newPositionName" v-model="newPosition.name">
                <div class="button-row">
                    <button @click.prevent="addPosition">Добавить должность</button>
                    <button @click.prevent="props.close">Закрыть</button>
                </div>
            </form>
            
        </div>
    </div>
</template>