<script lang="ts" setup>
import { imagesStore } from '../../stores/images-store.js';

//TODO: sort images by name
//TODO: click image to open
//TODO: click title to open
</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(image, index) in imagesStore.images" :key="index">
            <q-card class="image-card">
                <img class="image" :src="`data:${image.mimeType};base64,${image.data}`" />
                <q-card-section>
                    <div class="text-subtitle2">{{ image.fileName }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}

.image-card {
    height: 150px;
    margin-right: 20px;
}
.image {
    width: auto;
    height: 100px;
}
</style>