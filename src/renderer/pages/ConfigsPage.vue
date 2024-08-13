<script lang="ts" setup>
import { ref } from 'vue';
import ContentPad from '../components/ContentPad/ContentPad.vue';
import SizeInput from '../components/SizeInput/SizeInput.vue';
import { projectConfigStore } from '../stores/project-config-store';

const width = ref(projectConfigStore.width)
const height = ref(projectConfigStore.height)
const ppi = ref(projectConfigStore.ppi)

function save() {
    projectConfigStore.setConfigs({ width: width.value, height: height.value, ppi: ppi.value })
}

</script>
<template>
    <ContentPad>
        <q-card-section>
            <div class="text-h6">Card dimensions</div>
            <div class="flex">
                <SizeInput label="Width" v-model="width" />
                <div class="text-h6 x-label">X</div>
                <SizeInput label="Height" v-model="height" />
            </div>
        </q-card-section>
        <q-card-section>
            <div class="text-h6">Card quality</div>
            <q-input class="ppi" dense label="PPI" outlined type="number" v-model="ppi" />
        </q-card-section>
        <q-card-actions align="right">
            <q-btn label="Save" color="primary" @click="save" />
        </q-card-actions>
    </ContentPad>
</template>
<style>
.x-label {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
}

.ppi {
    width: 80px;
}
</style>