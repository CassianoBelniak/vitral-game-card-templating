<script setup>
import LateralBar from './components/LateralBar/LateralBar.vue'
</script>
<template>
  <q-layout view="lHr lpR lFr">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop">
      <LateralBar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>