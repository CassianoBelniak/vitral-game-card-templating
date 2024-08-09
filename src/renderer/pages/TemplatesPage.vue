<script lang="ts" setup>

</script>
<template>
    <ContentPad>
        <div class="row justify-between items-center">
            <div class="text-h6">Templates</div>
            <q-btn push icon="add" align="left" to="/templates/edit" no-caps>New template</q-btn>
        </div>
        <TemplateList />

    </ContentPad>
</template>