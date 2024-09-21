import { jsPDF } from 'jspdf'
import { ExportPipeline } from '../../typings/export.js'

export default async function exportPdfMultipleFiles(
    pipeline: ExportPipeline,
    pages: AsyncGenerator<HTMLCanvasElement, void, void>,
) {
    let counter = 0
    for await (const page of pages) {
        const pdf = new jsPDF({
            unit: 'px',
            format: [page.width, page.height],
        })
        counter += 1
        const data = page.toDataURL('image/png', 1).replace('data:image/png;base64,', '')
        pdf.addImage(data, 'png', 0, 0, page.width, page.height, String(counter), 'NONE')
        const path = `${pipeline.destination}/${String(counter).padStart(5, '0')}.pdf`
        const output = pdf.output('datauristring').replace('data:application/pdf;filename=generated.pdf;base64,', '')
        await window.electronAPI.saveFile(path, Buffer.from(output, 'base64'))
    }
}
