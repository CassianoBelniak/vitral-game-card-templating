<script lang="ts" setup>
    import { ref } from 'vue';
    import { templatesStore } from '../../../stores/templates-store.js';
    import TemplateHandlers from '../../TemplateHandlers/TemplateHandlers.vue';
    import { useQuasar } from 'quasar';

    const $q = useQuasar()
    const model = defineModel<string[]>({ default: [] })
    const props = defineProps<{
        label: string,
        cardName?: string
    }>()
    const isMainSectionOpen = ref(false)

    function onDelete(index: number) {
        $q.dialog({
            title: 'Remove?',
            message: `Are you sure you want to remove this template?`,
            cancel: true,
        }).onOk(() => {
            model.value.splice(index, 1)
        })
    }

    function onMoveUp(index: number) {
        if (index === 0) return;
        const temp = model.value[index - 1]
        model.value[index - 1] = model.value[index]
        model.value[index] = temp
    }

    function onMoveDown(index: number) {
        if (index === model.value.length - 1) return;
        const temp = model.value[index + 1]
        model.value[index + 1] = model.value[index]
        model.value[index] = temp
    }

    function onDuplicate(index: number) {
        model.value.splice(index, 0, model.value[index])
    }

    function onAddTemplate(templateName: string) {
        model.value.push(templateName)
    }

</script>
<template>
    <div class="row justify-between cursor-pointer" @click="isMainSectionOpen = !isMainSectionOpen">
        <div class="my-2 mr-2">
            <q-icon class="mr-2" size="2em" name="image" />
            {{ props.label }}
        </div>
        <div class="mt-1 mr-2 flex-1">
            <ExpandButton v-model="isMainSectionOpen" />
        </div>
        <div class="my-2 mr-2 template-counter">
            +{{ model.length }}
            <q-tooltip>
                +{{ model.length }} templates added to this section
            </q-tooltip>
        </div>
    </div>
    <q-slide-transition>
        <div class="mt-2" v-show="isMainSectionOpen">
            <template v-for="(templateName, index) in model" :key="templateName">
                <div class="row line">
                    <Fit class="templateContainer">
                        <RenderedTemplate :template="templatesStore.templates[templateName]" />
                    </Fit>
                    <div class="col template-label">
                        <RouterLink :to="{
                            path: `/templates/edit`, query: {
                                templateName, currentEditingCard: props.cardName
                            }
                        }">{{ templateName }}</RouterLink>
                    </div>
                    <div class="handlers">
                        <TemplateHandlers @delete="onDelete(index)" @move-down="onMoveDown(index)"
                            @move-up="onMoveUp(index)" @duplicate="onDuplicate(index)" />
                    </div>
                </div>
            </template>
        </div>
    </q-slide-transition>
    <TemplateSelector class="add-button" @template-selected="onAddTemplate" :card-name="props.cardName" />
</template>
<style land="scss" scoped>
    .line {
        margin-bottom: 10px;
    }

    .template-label {
        display: flex;
        padding-left: 10px;
        align-items: center
    }

    .handlers {
        display: flex;
        background-color: ;
        padding-left: 10px;
        align-items: center
    }

    .add-button {
        width: 100%;
    }

    .templateContainer {
        width: 40px;
        height: 60px;
    }

    .template-counter {
        color: gray
    }
</style>