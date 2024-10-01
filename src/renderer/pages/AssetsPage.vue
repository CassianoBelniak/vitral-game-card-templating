<script lang="ts" setup>
    import ContentPad from '../components/ContentPad/ContentPad.vue';

</script>
<template>
    <ContentPad>
        <ResourceTree :include-fonts="true" :include-images="true" />
    </ContentPad>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}
</style>