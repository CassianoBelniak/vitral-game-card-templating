<template>
    <div class="q-pa-md row items-start q-gutter-md">
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
</template>
<script>
import { createProject } from '../helpers/create-project.ts';
import { pickLoadProjectPath } from '../helpers/file-handling/pick-load-project-path.ts';
import { pickNewProjectPath } from '../helpers/file-handling/pick-new-project-path.ts';
import { addRecentProject } from '../services/config-service.ts';
import { fileStore } from '../stores/file-store.ts';


async function onNewProject() {
    const file = await pickNewProjectPath()
    fileStore.setProject(file)
    addRecentProject(file)
    await createProject()
}

async function onLoadProject() {
    const file = await pickLoadProjectPath()
    addRecentProject(file)
    fileStore.setProject(file)
}

export default {
    setup() {
        return {
            onLoadProject,
            onNewProject
        }
    }
}

</script>