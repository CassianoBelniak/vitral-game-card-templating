import { reactive } from 'vue'

const IMAGES_FOLDER = 'resources/images'

export const imagesStore = reactive({
    images: {} as Record<string, Buffer>,
})

async function loadImage(path: string) {
    const image = await window.electronAPI.loadFile(path)
    if (image) {
        imagesStore.images[path] = Buffer.from(image, 'base64')
    }
}

window.electronAPI.registerFileChangedCallback(
    async (path: string, event: string) => {
        if (path.includes(IMAGES_FOLDER)) {
            console.log(path, event)
            if (event === 'add' || event === 'change') {
                loadImage(path)
            }
            if (event === 'delete') {
                delete imagesStore.images[path]
            }
        }
    },
)
