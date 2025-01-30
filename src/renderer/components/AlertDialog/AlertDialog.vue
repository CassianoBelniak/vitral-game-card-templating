<script lang="ts" setup>
const model = defineModel<boolean>()
const props = defineProps<{
    title: string
    content: string
}>()
</script>
<template>
    <q-dialog v-model="model">
        <q-card>
            <q-card-section>
                <div class="text-h6">{{ props.title }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ props.content }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
