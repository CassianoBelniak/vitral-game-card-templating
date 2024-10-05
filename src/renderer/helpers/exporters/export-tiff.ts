import { ExportPipeline } from '../../typings/export.js'
import { ExportedPage } from '../../typings/page.js'
import canvasToTiffArrayBuffer from '../canvas-to-tiff-array-buffer.js'
import getPageFilename from '../get-page-filename.js'

export default async function exportTiff(pipeline: ExportPipeline, pages: AsyncGenerator<ExportedPage, void, void>) {
    let counter = 0
    for await (const page of pages) {
        counter += 1
        const data = canvasToTiffArrayBuffer(page.canvas, {
            dpi: 300, // I don't know which value should I put here cause a higher dpi in this application just means a bigger canvas. This is REAL dpi.
            littleEndian: true,
        })
        const filename = getPageFilename({ page, pipeline, counter, ext: 'tiff' })
        const path = `${pipeline.destination}/${filename}`
        await window.electronAPI.saveFile(path, Buffer.from(data, 'base64'))
    }
}
