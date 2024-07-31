<script lang="ts" setup>
import ContentPad from '../components/ContentPad/ContentPad.vue';
import ImageList from '../components/ImageList/ImageList.vue';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar.vue';
import { projectConfigStore } from '../stores/project-config-store.js';
import { QIcon } from 'quasar';

</script>
<template>
    <TopNavigationBar />
    <ContentPad>
        <q-card class="card-container">
            <q-card-section>
                <q-icon name="info" size="md" class="q-mr-sm" />
                Changes to <span class="text-bold">{{ projectConfigStore.workingDirectory }}/resources</span> are
                updated in real-time.
            </q-card-section>
        </q-card>
        <q-card class="card-container">
            <q-card-section>
                <div class="text-h6">Images</div>
            </q-card-section>
            <q-card-section>
                <ImageList />
            </q-card-section>
        </q-card>
        <q-card>
            <q-card-section>
                <div class="text-h6">Fonts</div>
            </q-card-section>
        </q-card>
    </ContentPad>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}
</style>