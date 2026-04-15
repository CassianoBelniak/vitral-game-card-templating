<script setup lang="ts">
import './stores/images-store.js'
import './stores/fonts-store.js'
import './stores/templates-store.js'
import './stores/cards-store.js'
import Composables from './components/Composables/Composables.vue'
</script>

<template>
    <router-view />
    <Composables />
</template>
