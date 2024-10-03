<script lang="ts" setup>
    import { ref } from 'vue';
    import ContentPad from '../components/ContentPad/ContentPad.vue';
    import SizeInput from '../components/SizeInput/SizeInput.vue';
    import { projectConfigStore } from '../stores/project-config-store';
    import { onBeforeRouteLeave } from 'vue-router';
    import { useQuasar } from 'quasar';
    const $q = useQuasar()

    const width = ref(projectConfigStore.width)
    const height = ref(projectConfigStore.height)
    const ppi = ref(projectConfigStore.ppi)

    function save() {
        projectConfigStore.setConfigs({ width: width.value, height: height.value, ppi: ppi.value })
    }

    onBeforeRouteLeave(() => {
        if (width.value === projectConfigStore.width && height.value === projectConfigStore.height && ppi.value === projectConfigStore.ppi) {
            return true
        }
        return new Promise(resolve => {
            $q.dialog({
                title: 'Unsaved changes',
                message: `Are you sure you want to leave? There are unsaved changes.`,
                cancel: true,
            }).onOk(() => {
                resolve(true)
            }).onCancel(() => resolve(false))
                .onDismiss(() => resolve(false))
        })
    })

</script>
<template>
    <ContentPad>
        <div class="column h-full w-full justify-between">

            <div>
                <div>Card dimensions</div>
                <div class="flex mb-2">
                    <SizeInput label="Width" v-model="width" />
                    <div class="text-h6 x-label">X</div>
                    <SizeInput label="Height" v-model="height" />
                </div>
                <div>Card quality</div>
                <q-input class="ppi" dense label="PPI" outlined type="number" v-model="ppi" debounce="1000" />
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn label="Save" color="primary" @click="save" no-caps />
            </div>
        </div>

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