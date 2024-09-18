<script lang="ts" setup>
    import { computed } from 'vue';
    import Template from '../../classes/template.js';
    import { templatesStore } from '../../stores/templates-store.js';
    import { useRouter } from 'vue-router';

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

</script>
<template>
    <div class="row">
        <div class="card-container" v-for="(template, index) in templatesStore.templates" :key="index">
            <div class="template-card" @click="goToTemplateEdit(template.name)" v-if="isTemplateVisible(template)">
                <div class="image">
                    <Fit>
                        <RenderedTemplate class="template" :template="template" />
                    </Fit>
                </div>
                <div>{{ template.name }}</div>
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