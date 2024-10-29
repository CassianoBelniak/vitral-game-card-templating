export interface ExportedPage {
    canvas: HTMLCanvasElement
    side?: string
    cardName?: string
    variables?: Record<string, string>
    index?: number
}
