<script lang="ts" setup>

</script>
<template>
    <ContentPad>
        <q-card class="card-container">
            <q-card-section class="row justify-between items-center">
                <div class="text-h6">Templates</div>
                <q-btn push icon="add" align="left" to="/templates/edit" no-caps>New template</q-btn>
            </q-card-section>
            <q-card-section>
                <TemplateList />
            </q-card-section>
        </q-card>
    </ContentPad>
</template>