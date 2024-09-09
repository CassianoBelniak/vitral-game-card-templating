import { ExportPipeline } from '../../typings/export.js'
import canvasToTiffArrayBuffer from '../canvas-to-tiff-array-buffer.js'

export default async function exportTiff(pipeline: ExportPipeline, pages: HTMLCanvasElement[]) {
    let counter = 0
    for (const page of pages) {
        counter += 1
        const data = canvasToTiffArrayBuffer(page, {
            dpi: 300, // I don't know which value should I put here cause a higher dpi means just a bigger canvas. This is REAL dpi.
            littleEndian: true,
        })
        const path = `${pipeline.destination}/${String(counter).padStart(5, '0')}.tiff`
        await window.electronAPI.saveFile(path, Buffer.from(data, 'base64'))
    }
}
