<script lang="ts" setup>
import ComponentRectangle from '../../../../classes/ComponentRectangle.js';

const model = defineModel<ComponentRectangle>()

</script>
<template>
    <q-card class="container">
        test
        <q-input v-model="model!.color" type="color" label="Color"></q-input>
    </q-card>
</template>
<style lang="scss" scoped>
.container {
    padding: 10px;
}
</style>