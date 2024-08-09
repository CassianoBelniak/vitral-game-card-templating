<script lang="ts" setup>
import ContentPad from '../components/ContentPad/ContentPad.vue';
import FontList from '../components/FontList/FontList.vue';
import ImageList from '../components/ImageList/ImageList.vue';

</script>
<template>
    <ContentPad>

        <q-card-section>
            <div class="text-h6">Images</div>
        </q-card-section>
        <q-card-section>
            <ImageList />
        </q-card-section>

        <q-card-section>
            <div class="text-h6">Fonts</div>
        </q-card-section>
        <q-card-section>
            <FontList />
        </q-card-section>
    </ContentPad>
</template>
<style scoped>
.card-container {
    margin-bottom: 30px;
}
</style>