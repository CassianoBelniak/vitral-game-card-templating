<script lang="ts" setup>
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { templatesStore } from '../stores/templates-store.js'
import { computed, ref } from 'vue'
import duplicateTemplate from '../helpers/duplicate-template.js'
import { useQuasar } from 'quasar'
import { isEqual } from 'lodash'
import isValidName from '../helpers/validators/is-valid-name.js'
import { projectConfigStore } from '../stores/project-config-store.js'
import renameTemplate from '../helpers/stores/io-utils/rename-template.js'
import { cardStore } from '../stores/cards-store.js'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const templateName = route.query.templateName?.toString() || ''
const currentEditingCardId = route.query.currentEditingCardId?.toString() || ''
const originalTemplate = templatesStore.templates[templateName]

const template = ref(duplicateTemplate(originalTemplate))
const skipLeaveMessage = ref(false)

const cardSize = computed(() => `${projectConfigStore.filters.editTemplate.cardSize}px`)

function saveTemplate() {
    skipLeaveMessage.value = true
    if (template.value.name !== templateName) {
        templatesStore.removeTemplate(templateName)
        renameTemplate(templateName, template.value.name)
    }
    templatesStore.setTemplate(template.value.name, template.value)
    if (currentEditingCardId) {
        router.push({ name: 'EditCard', query: { cardId: currentEditingCardId } })
    } else {
        router.push({ name: 'Templates' })
    }
}

const isValid = computed(
    () =>
        !!template.value.name &&
        isValidName(template.value.name) &&
        (!Object.keys(templatesStore.templates).includes(template.value.name) || template.value.name === templateName),
)

onBeforeRouteLeave(() => {
    if (skipLeaveMessage.value) return true
    if (isEqual(originalTemplate, template.value)) return true
    return new Promise((resolve) => {
        $q.dialog({
            title: 'Unsaved changes',
            message: `Are you sure you want to leave? There are unsaved changes.`,
            cancel: true,
        })
            .onOk(() => {
                resolve(true)
            })
            .onCancel(() => resolve(false))
            .onDismiss(() => resolve(false))
    })
})
</script>

<template>
    <ContentPad>
        <div class="column container">
            <div class="col-auto">
                <q-btn v-if="!currentEditingCardId" push icon="arrow_back" align="left" to="/templates" no-caps>Back to templates</q-btn>
                <q-btn
                    v-if="currentEditingCardId"
                    push
                    icon="arrow_back"
                    align="left"
                    :to="{
                        path: '/cards/edit',
                        query: {
                            cardId: currentEditingCardId,
                        },
                    }"
                    no-caps
                    >Back to {{ cardStore.cards[currentEditingCardId].name }}</q-btn
                >
            </div>
            <div class="col row">
                <div class="settings-container">
                    <TemplateComponents v-model="template" :template-name="templateName" />
                </div>
                <div class="col column items-center">
                    <Filterbar class="col-auto my-2 ml-3 p-2 w-full" v-model:cardSize="projectConfigStore.filters.editTemplate.cardSize" :hide-search="true" />
                    <div class="col w-full">
                        <InspectArea class="h-full ml-2" v-model:zoom="projectConfigStore.filters.editTemplate.cardSize">
                            <RenderedTemplate :draw-guides="true" class="card" :template="template" />
                        </InspectArea>
                    </div>
                </div>
            </div>
            <div class="col-auto row justify-end content-start">
                <q-btn v-if="!currentEditingCardId" push @click="saveTemplate" :disable="!isValid" color="primary" align="left" no-caps>Save</q-btn>
                <q-btn v-if="currentEditingCardId" push @click="saveTemplate" :disable="!isValid" color="primary" align="left" no-caps>Save</q-btn>
            </div>
        </div>
    </ContentPad>
</template>
<style lang="scss" scoped>
.container {
    height: 100%;
    max-width: 100%;
}

.settings-container {
    width: 400px;
}

.card {
    width: v-bind('cardSize');
}

.card-container {
    position: relative;
    width: v-bind('cardSize');
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
</style>
