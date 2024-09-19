<script lang="ts" setup>

</script>
<template>
    <ContentPad>
        <div class="row justify-between items-center mb-2">
            <div class="text-h6">Export pipelines</div>
            <q-btn push icon="add" align="left" to="/export/edit" no-caps>New pipeline</q-btn>
        </div>
        <ExportPipelineList />

    </ContentPad>
</template>