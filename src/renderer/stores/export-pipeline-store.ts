import { reactive } from 'vue'


import rebuildExportPipelineFromJSON from '../helpers/rebuild-template-from-json.js'
import { projectConfigStore } from './project-config-store.js'
import { ExportPipeline } from '../typings/export.js'

const EXPORT_PIPELINES_FOLDER = 'assets/export-pipelines/'
let saveTimer: NodeJS.Timeout | null = null
let ignoreIOEvents = false

export const exportPipelinesStore = reactive({
    exportPipelines: {} as Record<string, ExportPipeline>,
    setExportPipeline(name: string, template: ExportPipeline) {
        this.exportPipelines[name] = template
        triggerSave(name)
    },
    removeExportPipeline(name: string) {
        delete this.exportPipelines[name]
        deleteExportPipeline(name)
    },
})

async function deleteExportPipeline(templateName: string) {
    window.electronAPI.deleteFile(
        `${projectConfigStore.workingDirectory}/${EXPORT_PIPELINES_FOLDER}${templateName}.json`,
    )
}

async function saveExportPipeline(templateName: string) {
    ignoreIOEvents = true
    setTimeout(() => {
        ignoreIOEvents = false
    }, 2000)
    const template = exportPipelinesStore.exportPipelines[templateName]
    if (template) {
        const fileName = templateName.split('.').shift()
        window.electronAPI.saveFile(
            `${projectConfigStore.workingDirectory}/${EXPORT_PIPELINES_FOLDER}${fileName}.json`,
            Buffer.from(JSON.stringify(template, null, 4)),
        )
    }
}

function triggerSave(templateName: string) {
    if (saveTimer) {
        clearTimeout(saveTimer)
    }
    saveTimer = setTimeout(async () => {
        saveExportPipeline(templateName)
    }, 2000)
}

async function getFileName(path: string): Promise<string> {
    const fileName = path.split(EXPORT_PIPELINES_FOLDER).pop()
    if (fileName) {
        return fileName.replace('.json', '')
    }
    throw new Error('Could not get file name')
}

async function loadExportPipeline(path: string): Promise<ExportPipeline> {
    const data = (await window.electronAPI.loadFile(path)) || ''
    const json = atob(data)
    if (json) {
        return JSON.parse(json)
    }
    throw new Error('Could not load pipeline')
}

async function onFileChanged(path: string, event: string) {
    //TODO: add file blacklist for extensions
    if (ignoreIOEvents) {
        return
    }
    if (path.includes(EXPORT_PIPELINES_FOLDER)) {
        const fileName = await getFileName(path)
        if (event === 'add' || event === 'change') {
            exportPipelinesStore.exportPipelines[fileName] =
                await loadExportPipeline(path)
        }
        if (event === 'unlink') {
            delete exportPipelinesStore.exportPipelines[fileName]
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)
