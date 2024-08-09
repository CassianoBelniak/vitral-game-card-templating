<script lang="ts" setup>
import ContentPad from '../components/ContentPad/ContentPad.vue';
import FontList from '../components/FontList/FontList.vue';
import ImageList from '../components/ImageList/ImageList.vue';

</script>
<template>
    <ContentPad>
        <div class="text-h6">Images</div>
        <ImageList />
        <div class="text-h6">Fonts</div>
        <FontList />
    </ContentPad>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}
</style>