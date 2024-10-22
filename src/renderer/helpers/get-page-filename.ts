import { ExportPipeline } from '../typings/export.js'
import { ExportedPage } from '../typings/page.js'
import removeInvalidCharsFromFilename from './remove-invalid-chars-from-filename.js'

function getValues({
    page,
    counter,
    ext,
}: {
    page: ExportedPage
    pipeline: ExportPipeline
    counter: number
    ext: string
}): Record<string, string> {
    const now = new Date()

    const variables: Record<string, string> = {}
    for (const [key, value] of Object.entries(page.variables || {})) {
        variables[`$${key}`] = value
    }

    return {
        page: String(counter),
        ext,
        side: String(page.side || 'both'),
        cardName: page.cardName || 'page',
        SS: String(now.getSeconds()),
        mm: String(now.getMinutes()),
        DD: String(now.getDate()),
        MM: String(now.getMonth() + 1),
        YY: String(now.getFullYear()),
        random: String(Math.round(Math.random() * 8)),
        ...variables,
    }
}

export default function getPageFilename({
    page,
    pipeline,
    counter,
    ext,
}: {
    page: ExportedPage
    pipeline: ExportPipeline
    counter: number
    ext: string
}) {
    const values = getValues({ page, pipeline, counter, ext })
    const filename =
        pipeline.exportNameTemplate?.replace(/{.*?}/g, (match: string) => {
            const [key, padding = '0', char = ' '] = match.replace(/[{} ]/g, '').split(',')
            const value = values[key] || 'null'
            return value.padStart(Number(padding), char)
        }) || ''
    return removeInvalidCharsFromFilename(filename)
}
