<script lang="ts" setup>
import { fontsStore } from '../../stores/fonts-store.js';

//TODO: sort fonts by name
//TODO: click image to open
//TODO: click title to open
</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(font, index) in fontsStore.fonts" :key="index">
            <q-card class="font-card">
                <q-card-section>
                    <div class="text-h6 example-text" :style="`font-family: '${font.fileName}'`">Lorem ipsum dolor sit
                        amet
                        consectetur, adipisicing elit. Impedit
                        recusandae
                        quia quos quod libero iure asperiores reiciendis veniam omnis eaque suscipit aliquid nulla
                        itaque, consequatur minus! Culpa officiis ea hic!</div>
                </q-card-section>
                <q-card-section>
                    <div class="text-subtitle2">{{ font.fileName }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}

.font-card {
    height: 150px;
    width: 300px;
    margin-right: 20px;
}

.example-text {
    width: 100%;
    height: 70px;
    overflow: hidden;
}
</style>