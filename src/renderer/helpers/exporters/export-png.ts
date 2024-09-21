import { ExportPipeline } from '../../typings/export.js'

export default async function exportPng(
    pipeline: ExportPipeline,
    pages: AsyncGenerator<HTMLCanvasElement, void, void>,
) {
    let counter = 0
    for await (const page of pages) {
        counter += 1
        const data = page.toDataURL('image/png', 1).replace('data:image/png;base64,', '')
        const path = `${pipeline.destination}/${String(counter).padStart(5, '0')}.png`
        await window.electronAPI.saveFile(path, Buffer.from(data, 'base64'))
    }
}
