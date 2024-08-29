interface DrawOptions {
    font?: string
    isFilled?: boolean
    rect?: {
        x: number
        y: number
        width: number
        height: number
    }
    lineHeight?: number
    fontSize?: number
    verticalAlign?: string
    tooltipColor?: string
    color?: string
}

interface Line {
    text: string
    x: number
    y: number
    length: number
}

export default function drawMultilineText(
    ctx: CanvasRenderingContext2D,
    text: string,
    options: DrawOptions,
): void {
    // Set default options
    options = setDefaultOptions(ctx, options)

    // Calculate lines that fit within the given rectangle
    const { lines, lineHeight, yPosition } = calculateLines(ctx, text, options)

    // Adjust the vertical alignment if needed
    const offset = calculateVerticalOffset(options, yPosition, lineHeight)

    // Draw the text lines on the canvas
    drawTextLines(ctx, lines, options, offset)
}

function setDefaultOptions(
    ctx: CanvasRenderingContext2D,
    options: DrawOptions,
): DrawOptions {
    options = options || {}
    options.font = options.font || 'sans-serif'
    options.isFilled = options.isFilled !== undefined ? options.isFilled : false
    options.rect = options.rect || {
        x: 0,
        y: 0,
        width: ctx.canvas.width,
        height: ctx.canvas.height,
    }
    options.lineHeight = options.lineHeight || 1.1
    options.fontSize = options.fontSize || 30
    return options
}

function calculateLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    options: DrawOptions,
): { lines: Line[]; lineHeight: number; yPosition: number } {
    const lineHeight = options.fontSize! * options.lineHeight!
    ctx.font = `${options.fontSize}px ${options.font}`

    const x = options.rect!.x
    let y = lineHeight
    const lines: Line[] = []
    let line = ''
    const words = getWords(text)

    for (const word of words) {
        const linePlus = line + word + ' '
        if (
            ctx.measureText(linePlus.replace(/[<>]/g, '')).width >
            options.rect!.width
        ) {
            lines.push({
                text: line,
                x,
                y,
                length: ctx.measureText(line.replace(/[<>]/g, '').trim()).width,
            })
            line = word + ' '
            y += lineHeight
        } else {
            line = linePlus
        }
    }

    lines.push({
        text: line,
        x,
        y,
        length: ctx.measureText(line.replace(/[<>]/g, '')).width,
    })

    return {
        lines: lines,
        lineHeight: lineHeight,
        yPosition: y,
    }
}

function calculateVerticalOffset(
    options: DrawOptions,
    yPosition: number,
    lineHeight: number,
): number {
    let offset = options.rect!.y
    if (options.verticalAlign === 'center') {
        offset -= lineHeight / 2 + (options.rect!.height - yPosition) / 2
    }
    return offset
}

function drawChar(
    ctx: CanvasRenderingContext2D,
    char: string,
    x: number,
    y: number,
    options: DrawOptions,
): void {
    if (options.isFilled) {
        ctx.fillText(char, x, y)
    } else {
        ctx.strokeText(char, x, y)
    }
}

function drawTextLines(
    ctx: CanvasRenderingContext2D,
    lines: Line[],
    options: DrawOptions,
    offset: number,
): void {
    for (const line of lines) {
        const text = line.text.trim()
        ctx.textAlign = 'left'
        let xCursor = line.x - line.length / 2
        for (const char of text.split('')) {
            if (char === '<') {
                ctx.fillStyle = options.tooltipColor!
            } else if (char === '>') {
                ctx.fillStyle = options.color!
            } else {
                drawChar(ctx, char, xCursor, line.y + offset, options)
                xCursor += ctx.measureText(char).width
            }
        }
    }
}

// Assuming getWords is declared elsewhere
function getWords(text: string) {
    return text.split(' ')
}
