import { reactive, watch } from 'vue'
import path from 'path'
import { showError } from '../helpers/notify.js'
import debounce from 'debounce'
import { globalStore } from './global-store.js'

export const projectConfigStore = reactive({
    width: '63mm',
    height: '88mm',
    ppi: 300,
    workingDirectory: '',
    projectName: '',
    colorPalette: ['#000000', '#FFFFFF'],
    filters: {
        cards: {
            searchText: '',
            tags: [],
            visibleColumns: { _internal_name: true, _internal_tags: true, _internal_front: true, _internal_back: true } as Record<string, boolean>,
        },
        templates: {
            cardSize: 200,
            searchText: '',
        },
        editExport: {
            cardSize: 200,
            searchText: '',
        },
        editCard: {
            cardSize: 200,
            showFront: true,
            showBack: true,
            overlay: false,
        },
        editTemplate: {
            cardSize: 200,
            showComponentMargins: false,
        },
    },
    path: '',
    async setProject(projectPath: string) {
        this.workingDirectory = path.dirname(projectPath)
        this.projectName = path.basename(projectPath)
        this.path = projectPath
        await loadConfig()
    },
})

watch(projectConfigStore, () => {
    debouncedSaveConfig()
})

const debouncedSaveConfig = debounce(() => {
    saveConfig()
}, 1000)

async function loadConfig() {
    if (globalStore.isProjectLoading) return
    try {
        const file = await window.electronAPI.loadFile(projectConfigStore.path)
        if (file) {
            const buffer = Buffer.from(file, 'base64')
            const config = JSON.parse(buffer.toString('utf8'))
            projectConfigStore.width = config.width
            projectConfigStore.height = config.height
            projectConfigStore.ppi = config.ppi
            projectConfigStore.filters = config.filters
            projectConfigStore.colorPalette = config.colorPalette
        }
    } catch (error: unknown) {
        showError('Error loading configs', error as Error)
        return {}
    }
}

export async function saveConfig() {
    const content = {
        version: '0.1',
        width: projectConfigStore.width,
        height: projectConfigStore.height,
        ppi: projectConfigStore.ppi,
        filters: projectConfigStore.filters,
        colorPalette: projectConfigStore.colorPalette,
    }
    window.electronAPI.saveFile(projectConfigStore.path, Buffer.from(JSON.stringify(content, null, 4)))
}
