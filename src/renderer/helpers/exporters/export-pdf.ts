import { jsPDF } from 'jspdf'
import { ExportPipeline } from '../../typings/export.js'
import { ExportedPage } from '../../typings/page.js'
import getPageFilename from '../get-page-filename.js'
import getAbsoluteFolder from '../get-absolute-folder.js'

export default async function exportPdf(pipeline: ExportPipeline, pages: AsyncGenerator<ExportedPage, void, void>) {
    let counter = 1
    let first = true
    let pdf
    for await (const page of pages) {
        if (first) {
            pdf = new jsPDF({
                unit: 'px',
                format: [page.canvas.width, page.canvas.height],
            })
            pdf.addPage([page.canvas.width, page.canvas.height])
        }
        first = false
        counter += 1
        const data = page.canvas.toDataURL('image/png', 1).replace('data:image/png;base64,', '')
        pdf!.addImage(data, 'png', 0, 0, page.canvas.width, page.canvas.height, String(counter), 'NONE')
    }
    if (!pdf) return
    const page = { canvas: document.createElement('canvas') } // Not needed but I dont want to mess with type check for every exporter
    const filename = getPageFilename({ page, pipeline, counter, ext: 'pdf' })
    const folder = getAbsoluteFolder(pipeline.destination)
    const path = `${folder}/${filename}`
    const output = pdf.output('datauristring').replace('data:application/pdf;filename=generated.pdf;base64,', '')
    await window.electronAPI.saveFile(path, Buffer.from(output, 'base64'))
}
