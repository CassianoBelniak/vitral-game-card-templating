<script lang="ts" setup>
import { computed } from 'vue'
import { templatesStore } from '../../stores/templates-store.js'
import RenderedTemplate from '../RenderedTemplate/RenderedTemplate.vue'

const props = defineProps<{
    cardId?: string
}>()

const emits = defineEmits<{
    templateSelected: [templateName: string]
}>()

const templateNames = computed(() => Object.keys(templatesStore.templates))
</script>
<template>
    <q-btn-dropdown icon="add" no-caps label="Add template" class="add-component-button">
        <q-list>
            <q-item clickable v-close-popup @click="emits('templateSelected', templateName)" v-for="templateName in templateNames" v-bind:key="templateName">
                <q-item-section avatar>
                    <RenderedTemplate class="template" :template="templatesStore.templates[templateName]" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ templateName }}</q-item-label>
                </q-item-section>
            </q-item>
            <RouterLink
                :to="{
                    path: `/templates/edit`,
                    query: {
                        currentEditingCardId: props.cardId,
                    },
                }"
            >
                <q-item clickable v-close-popup>
                    <q-item-section>
                        <q-item-label>New template</q-item-label>
                    </q-item-section>
                </q-item>
            </RouterLink>
        </q-list>
    </q-btn-dropdown>
</template>
<style lang="scss" scoped>
.template {
    width: 40px;
}
</style>
