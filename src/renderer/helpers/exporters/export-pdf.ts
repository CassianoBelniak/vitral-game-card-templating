import { jsPDF } from 'jspdf'
import { ExportPipeline } from '../../typings/export.js'

export default async function exportPdf(pipeline: ExportPipeline, pages: HTMLCanvasElement[]) {
    if (pages.length === 0) return
    let counter = 0
    const pdf = new jsPDF({
        unit: 'px',
        format: [pages[0].width, pages[0].height],
    })
    let first = true
    for (const page of pages) {
        if (!first) {
            pdf.addPage([page.width, page.height])
        }
        first = false
        counter += 1
        const data = page.toDataURL('image/png', 1).replace('data:image/png;base64,', '')
        pdf.addImage(data, 'png', 0, 0, page.width, page.height, String(counter), 'NONE')
    }
    const path = `${pipeline.destination}/00001.pdf`
    const output = pdf.output('datauristring').replace('data:application/pdf;filename=generated.pdf;base64,', '')
    await window.electronAPI.saveFile(path, Buffer.from(output, 'base64'))
}
