<template>
    <q-card-section>
        <div class="text-h6">Recent</div>
    </q-card-section>
    <q-card-actions vertical align="left" v-for="item in recentProjects" :key="item">
        <q-btn push class="full-width" align="left">{{ item }}</q-btn>
    </q-card-actions>
</template>
<script>
import { getRecentProjects } from '../../services/config-service.ts';

export default {
    async setup() {
        return { recentProjects: await getRecentProjects() }
    }
}

</script>