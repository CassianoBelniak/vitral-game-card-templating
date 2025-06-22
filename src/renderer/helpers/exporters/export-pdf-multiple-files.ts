import { jsPDF } from 'jspdf'
import { ExportPipeline } from '../../typings/export.js'
import { ExportedPage } from '../../typings/page.js'
import getPageFilename from '../get-page-filename.js'
import getAbsoluteFolder from '../get-absolute-folder.js'

export default async function exportPdfMultipleFiles(pipeline: ExportPipeline, pages: AsyncGenerator<ExportedPage, void, void>) {
    let counter = 0
    for await (const page of pages) {
        const pdf = new jsPDF({
            unit: 'px',
            format: [page.canvas.width, page.canvas.height],
        })
        counter += 1
        const data = page.canvas.toDataURL('image/png', 1).replace('data:image/png;base64,', '')
        pdf.addImage(data, 'png', 0, 0, page.canvas.width, page.canvas.height, String(counter), 'NONE')
        const filename = getPageFilename({ page, pipeline, counter, ext: 'pdf' })
        const folder = getAbsoluteFolder(pipeline.destination)
        const path = `${folder}/${filename}`
        const output = pdf.output('datauristring').replace('data:application/pdf;filename=generated.pdf;base64,', '')
        await window.electronAPI.saveFile(path, Buffer.from(output, 'base64'))
    }
}
