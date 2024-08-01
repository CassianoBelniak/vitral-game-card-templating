import { reactive } from 'vue'
import { registerFont, unregisterFont } from '../helpers/manage-font.js'

const FONTS_FOLDER = 'resources/fonts/'

type Font = {
    data: string
    fileName: string
    path: string
}

export const fontsStore = reactive({
    fonts: {} as Record<string, Font>,
})

async function getFont(path: string) {
    const data = await window.electronAPI.loadFile(path)
    if (data) {
        return {
            path,
            data,
            fileName: await getFileName(path),
        }
    }
    throw new Error('Could not load image')
}

async function getFileName(path: string): Promise<string> {
    const fileName = path.split(FONTS_FOLDER).pop()
    if (fileName) {
        return fileName
    }
    throw new Error('Could not get file name')
}

async function onFileChanged(path: string, event: string) {
    //TODO: add file blacklist for extensions
    if (path.includes(FONTS_FOLDER)) {
        const fileName = await getFileName(path)
        if (event === 'add' || event === 'change') {
            fontsStore.fonts[fileName] = await getFont(path)
            registerFont(fileName, fontsStore.fonts[fileName].data)
        }
        if (event === 'unlink') {
            delete fontsStore.fonts[fileName]
            unregisterFont(fileName)
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)
