import { ExportPipeline } from '../../typings/export.js'
import { ExportedPage } from '../../typings/page.js'
import getPageFilename from '../get-page-filename.js'

export default async function exportPng(pipeline: ExportPipeline, pages: AsyncGenerator<ExportedPage, void, void>) {
    let counter = 0
    for await (const page of pages) {
        counter += 1
        const data = page.canvas.toDataURL('image/png', 1).replace('data:image/png;base64,', '')
        const filename = getPageFilename({ page, pipeline, counter, ext: 'png' })
        const path = `${pipeline.destination}/${filename}`
        await window.electronAPI.saveFile(path, Buffer.from(data, 'base64'))
    }
}
