import { reactive } from 'vue'
import { getMimeTypeFromBase64 } from '../helpers/get-mime-type-from-base-64.js'

const IMAGES_FOLDER = 'resources/images/'

type Image = {
    data: string
    mimeType: string
    fileName: string
    path: string
}

export const imagesStore = reactive({
    images: {} as Record<string, Image>,
})

async function getImage(path: string) {
    const data = await window.electronAPI.loadFile(path)
    if (data) {
        return {
            path,
            data,
            fileName: await getFileName(path),
            mimeType: getMimeTypeFromBase64(data),
        }
    }
    throw new Error('Could not load image')
}

async function getFileName(path: string): Promise<string> {
    const fileName = path.split(IMAGES_FOLDER).pop()
    if (fileName) {
        return fileName
    }
    throw new Error('Could not get file name')
}

async function onFileChanged(path: string, event: string) {
    //TODO: add file blacklist for extensions
    if (path.includes(IMAGES_FOLDER)) {
        const fileName = await getFileName(path)
        if (event === 'add' || event === 'change') {
            imagesStore.images[fileName] = await getImage(path)
        }
        if (event === 'unlink') {
            delete imagesStore.images[fileName]
        }
    }
}

window.electronAPI.registerFileChangedCallback(onFileChanged)
