import { reactive } from 'vue'
import { projectConfigStore } from './project-config-store.js'
import Template from '../classes/template.js'

const TEMPLATES_FOLDER = 'assets/templates/'
let saveTimer: NodeJS.Timeout | null = null
let ignoreIOEvents = false

export const templatesStore = reactive({
    templates: {} as Record<string, Template>,
    setTemplate(name: string, template: Template) {
        this.templates[name] = template
        triggerSave(name)
    },
    removeTemplate(name: string) {
        delete this.templates[name]
        deleteTemplate(name)
    },
})

async function deleteTemplate(templateName: string) {
    window.electronAPI.deleteFile(
        `${projectConfigStore.workingDirectory}/${TEMPLATES_FOLDER}${templateName}.json`,
    )
}

async function saveTemplate(templateName: string) {
    ignoreIOEvents = true
    setTimeout(() => {
        ignoreIOEvents = false
    }, 2000)
    const template = templatesStore.templates[templateName]
    if (template) {
        const fileName = templateName.split('.').shift()
        window.electronAPI.saveFile(
            `${projectConfigStore.workingDirectory}/${TEMPLATES_FOLDER}${fileName}.json`,
            Buffer.from(JSON.stringify(template, null, 4)),
        )
    }
}

function triggerSave(templateName: string) {
    if (saveTimer) {
        clearTimeout(saveTimer)
    }
    saveTimer = setTimeout(async () => {
        saveTemplate(templateName)
    }, 2000)
}

async function getFileName(path: string): Promise<string> {
    const fileName = path.split(TEMPLATES_FOLDER).pop()
    if (fileName) {
        return fileName
    }
    throw new Error('Could not get file name')
}

async function loadTemplate(path: string): Promise<Template> {
    const data = (await window.electronAPI.loadFile(path)) || ''
    const json = atob(data)
    if (json) {
        return JSON.parse(json)
    }
    throw new Error('Could not load template')
}

async function onFileChanged(path: string, event: string) {
    //TODO: add file blacklist for extensions
    if (ignoreIOEvents) {
        return
    }
    if (path.includes(TEMPLATES_FOLDER)) {
        const fileName = await getFileName(path)
        if (event === 'add' || event === 'change') {
            templatesStore.templates[fileName] = await loadTemplate(path)
        }
        if (event === 'unlink') {
            delete templatesStore.templates[fileName]
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)
