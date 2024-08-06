import { reactive } from 'vue'
import path from 'path'
import convertToPixels from '../helpers/convert-to-pixels.js'

type ProjectConfig = {
    width?: string
    height?: string
    ppi?: number
}

export const projectConfigStore = reactive({
    width: '63mm',
    height: '88mm',
    ppi: 300,
    workingDirectory: '',
    projectName: '',
    path: '',
    setProject(projectPath: string) {
        this.workingDirectory = path.dirname(projectPath)
        this.projectName = path.basename(projectPath)
        this.path = projectPath
        loadConfig()
    },
    setConfigs(config: ProjectConfig) {
        this.width = config.width || this.width
        this.height = config.height || this.height
        this.ppi = config.ppi || this.ppi
        saveConfig()
    },
    getParsedSizes() {
        return {
            width: convertToPixels(this.width, this.ppi),
            height: convertToPixels(this.height, this.ppi),
        }
    },
})

async function loadConfig() {
    const file = await window.electronAPI.loadFile(projectConfigStore.path)
    if (file) {
        const buffer = Buffer.from(file, 'base64')
        const config = JSON.parse(buffer.toString('utf8'))
        projectConfigStore.width = config.width
        projectConfigStore.height = config.height
        projectConfigStore.ppi = config.ppi
    }
}

async function saveConfig() {
    const content = {
        width: projectConfigStore.width,
        height: projectConfigStore.height,
        ppi: projectConfigStore.ppi,
    }
    window.electronAPI.saveFile(
        projectConfigStore.path,
        Buffer.from(JSON.stringify(content, null, 4)),
    )
}


