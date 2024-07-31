<template>
    <TopNavigationBar />
    <ContentPad>
        <div class="row">
            <q-card class="my-card bg-dark text-white">
                <q-card-section>
                    <div class="text-h6">Martelo card builder</div>
                </q-card-section>

                <q-card-actions vertical align="left">
                    <q-btn push icon="add" class="full-width" align="left" @click="onNewProject()" no-caps>New
                        project</q-btn>
                    <q-btn push icon="save" class="full-width" align="left" @click="onLoadProject()" no-caps>Load
                        project</q-btn>
                </q-card-actions>

                <q-separator />

                <Suspense>
                    <RecentProjects />
                </Suspense>

            </q-card>
        </div>
    </ContentPad>
</template>
<script setup lang="ts">
import { pickLoadProjectPath } from '../helpers/file-handling/pick-load-project-path';
import { pickNewProjectPath } from '../helpers/file-handling/pick-new-project-path';
import { addRecentProject } from '../services/config-service';
import { useRouter } from 'vue-router'
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar.vue';
import ContentPad from '../components/ContentPad/ContentPad.vue';
import { projectConfigStore } from '../stores/project-config-store.js';
import { assertProjectStructure } from '../helpers/file-handling/assert-project-structure.js';
import { watchFileChanges } from '../helpers/file-handling/watch-file-changes.js';
const router = useRouter()

async function onNewProject() {
    const file = await pickNewProjectPath()
    projectConfigStore.setProject(file)
    addRecentProject(file)
    watchFileChanges(projectConfigStore.workingDirectory)
    assertProjectStructure(projectConfigStore.workingDirectory)
    router.push({ path: '/gallery' })
}

async function onLoadProject() {
    const file = await pickLoadProjectPath()
    addRecentProject(file)
    projectConfigStore.setProject(file)
    assertProjectStructure(projectConfigStore.workingDirectory)
    watchFileChanges(projectConfigStore.workingDirectory)
    router.push({ path: '/gallery' })
}

</script>