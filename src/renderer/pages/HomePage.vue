<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card bg-dark text-white">
            <q-card-section>
                <div class="text-h6">Martelo card builder</div>
            </q-card-section>

            <q-card-actions vertical align="left">
                <q-btn push icon="add" class="full-width" align="left" @click="onNewProject()">New project</q-btn>
                <q-btn push icon="save" class="full-width" align="left" @click="onLoadProject()">Load
                    project</q-btn>
            </q-card-actions>

            <q-separator />

            <q-card-section>
                <div class="text-h6">Recent</div>
            </q-card-section>

            <q-card-actions vertical align="left">
                <q-btn push class="full-width" align="left">Cardsss</q-btn>
                <q-btn push class="full-width" align="left">Shipper</q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>
<script>

async function onNewProject() {
    const pickerOpts = {
        id: 'martelo-project',
        title: 'Create project',
        defaultPath: 'New Project',
        buttonLabel: 'Create',
        filters: [
            {
                name: "Project",
                extensions: ['martelo'],
            },
        ],
        properties: ['openFile', 'promptToCreate', 'createDirectory ']
    };
    const file = await window.electronAPI.saveDialog(pickerOpts)
    console.log(file)
}

async function onLoadProject() {
    const pickerOpts = {
        id: 'martelo-project',
        title: 'Open project',
        buttonLabel: 'Open',
        filters: [
            {
                name: "Project",
                extensions: ['martelo'],
            },
        ],
        properties: ['openFile']
    };
    const file = await window.electronAPI.openDialog(pickerOpts)
    console.log(file)
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