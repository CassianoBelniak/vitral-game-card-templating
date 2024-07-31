<script lang="ts" setup>
import { imagesStore } from '../../stores/images-store.js';

</script>
<template>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 card-container" v-for="image in imagesStore.images" :key="image">
            <q-card class="my-card bg-dark text-white">
                <q-card-section>
                    <div class="text-h6">{{ image }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}
</style>