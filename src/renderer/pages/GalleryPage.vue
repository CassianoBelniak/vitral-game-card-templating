<script lang="ts" setup>


</script>
<template>
    <ContentPad>
        <div class="row justify-between items-center">
            <div class="text-h6">Cards</div>
            <q-btn push icon="add" align="left" to="/cards/edit" no-caps>New card</q-btn>
        </div>
        <CardList />

    </ContentPad>
</template>