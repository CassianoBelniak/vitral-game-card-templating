import { ExportPipeline } from '../../typings/export.js'

export default async function exportJpeg(pipeline: ExportPipeline, pages: HTMLCanvasElement[]) {
    let counter = 0
    for (const page of pages) {
        counter += 1
        const data = page.toDataURL('image/jpeg', 1).replace('data:image/jpeg;base64,', '')
        const path = `${pipeline.destination}/${String(counter).padStart(5, '0')}.jpeg`
        await window.electronAPI.saveFile(path, Buffer.from(data, 'base64'))
    }
}
