interface ExportCardSettings {
    cardName: string
    ammount: number
}

export interface ExportPipeline {
    name: string
    destination: string
    extension: string
    exportType: string
    bleedingX: string
    bleedingY: string
    marginX: string
    marginY: string
    backsideOffsetX: string
    backsideOffsetY: string
    frontsideOffsetX: string
    frontsideOffsetY: string
    parseCMYK: boolean
    paperWidth: string
    paperHeight: string
    cardSidesSpacing: string
    cards: { [key: string]: number }
    cropCardContent: boolean
}
