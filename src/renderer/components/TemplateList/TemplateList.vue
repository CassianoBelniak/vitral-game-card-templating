<script lang="ts" setup>
    import { computed } from 'vue';
    import Template from '../../classes/template.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import { useRouter } from 'vue-router';
    import duplicateTemplate from '../../helpers/duplicate-template.js';
    import { useQuasar } from 'quasar';
    import removeTemplate from '../../helpers/stores/io-utils/remove-template.js';

    const $q = useQuasar()
    const router = useRouter();

    const props = defineProps<{
        cardSize: number
        searchText: string
    }>()

    const cardSize = computed(() => `${props.cardSize}px`)


    const goToTemplateEdit = (templateName: string) => {
        router.push({ name: 'EditTemplate', query: { templateName } })
    };

    function isTemplateVisible(template: Template) {
        return template.name.toLowerCase().includes(props.searchText.toLowerCase())
    }

    function onDuplicateTemplate(templateName: string) {
        const copy = duplicateTemplate(templatesStore.templates[templateName])
        copy.name += '_copy'
        templatesStore.setTemplate(copy.name, copy)
    }

    function onRemoveTemplate(templateName: string) {
        $q.dialog({
            title: 'Delete?',
            message: `Are you sure you want to delete ${templateName}?`,
            cancel: true,
        }).onOk(() => {
            templatesStore.removeTemplate(templateName)
            removeTemplate(templateName)
        })
    }

</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(template, index) in templatesStore.templates" :key="index">
            <div class="template-card" v-if="isTemplateVisible(template)">
                <div class="image" @click="goToTemplateEdit(template.name)">
                    <Fit>
                        <RenderedTemplate class="template" :template="template" />
                    </Fit>
                </div>
                <div class="mt-2 row justify-between">
                    <div @click="goToTemplateEdit(template.name)" class="col-auto mt-2">
                        {{ template.name }}
                    </div>
                    <div class="col-auto">
                        <q-btn icon="delete" flat round @click="onRemoveTemplate(template.name)" />
                        <q-btn icon="content_copy" flat round @click="onDuplicateTemplate(template.name)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .card-container {
        margin-bottom: 30px;
    }

    .image {
        width: 100%;
        height: 50%;
    }

    .template-card {
        width: v-bind('cardSize');
        margin-right: 20px;
        cursor: pointer;
    }
</style>