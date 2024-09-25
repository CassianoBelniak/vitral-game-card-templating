interface DrawOptions {
    width: number
    height: number
    x: number
    y: number
    offsetX: number
    offsetY: number
    rotation: number
    color: string
    isFilled: boolean
    fontSize: number
    text: string
    alignment: string
    context: object
    font: string
    tooltipColor: string
    verticalAlign: string
    lineHeight: number
}

interface Line {
    text: string
    y: number
    length: number
}

interface GetContentHeightParams {
    ctx: CanvasRenderingContext2D
    text: string
    width: number
    lineHeight: number
}

function createCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
}

function getContext(canvas: HTMLCanvasElement, font: string, fontSize: number) {
    const ctx = canvas.getContext('2d')
    ctx!.font = `${fontSize}px '${font}'`
    ctx!.textAlign = 'left'
    ctx!.textBaseline = 'top'
    return ctx!
}

function getPureText(text: string) {
    return text.replace(/[<>]/g, '')
}

function getLineOffset(lineWidth: number, rectWidth: number, alignment: string) {
    if (alignment === 'left') return 0
    if (alignment === 'right') return rectWidth - lineWidth
    return rectWidth / 2 - lineWidth / 2
}

export function getTextCanvas(parentCtx: CanvasRenderingContext2D, options: DrawOptions) {
    const lines = calculateLines(parentCtx, options.text, options.width)
    const canvas = createCanvas(options.width, lines.length * options.lineHeight)
    const ctx = getContext(canvas, options.font, options.fontSize)
    let y = 0
    for (const line of lines) {
        const textSize = ctx?.measureText(getPureText(line))
        const lineWidth = textSize?.width ?? 0
        const lineOffset = getLineOffset(lineWidth, options.width, options.alignment)
        drawLine(ctx, line, lineOffset, y, options.isFilled, options.color, options.tooltipColor)
        y += options.lineHeight
    }
    return canvas
}

export function getContentHeight({ ctx, text, width, lineHeight }: GetContentHeightParams) {
    const lines = calculateLines(ctx, text, width)
    return lines.length * lineHeight
}

function calculateLines(ctx: CanvasRenderingContext2D, text: string, width: number) {
    const lines: string[] = []
    let line = ''
    const words = getWords(text)

    for (const word of words) {
        const linePlus = line + word + ' '
        if (ctx.measureText(linePlus.replace(/(<[^<])|(>[^>])/g, '')).width > width) {
            lines.push(line)
            line = word + ' '
        } else {
            line = linePlus
        }
    }

    lines.push(line)

    return lines
}

function drawChar(ctx: CanvasRenderingContext2D, char: string, x: number, y: number, isFilled: boolean): void {
    if (isFilled) {
        ctx.fillText(char, x, y)
    } else {
        ctx.strokeText(char, x, y)
    }
}

function getVisibleChar(char: string, chars: string[], index: number) {
    if (['<', '>', '[', ']'].includes(char)) {
        if (chars[index + 1] === char) return char
        return ''
    }
    return char
}

function drawLine(
    ctx: CanvasRenderingContext2D,
    line: string,
    x: number,
    y: number,
    isFilled: boolean,
    color: string,
    tooltipColor: string,
) {
    let xCursor = x
    const chars = line.split('')
    for (const [index, char] of chars.entries()) {
        const visibleChar = getVisibleChar(char, chars, index)
        if (visibleChar) {
            drawChar(ctx, char, xCursor, y, isFilled)
            xCursor += ctx.measureText(char).width
        }
        if (char === '<' && chars[index + 1] !== char) {
            ctx.fillStyle = tooltipColor!
        } else if (char === '>' && chars[index + 1] !== char) {
            ctx.fillStyle = color!
        } else {
        }
    }
}

function getWords(text: string) {
    return text.split(' ')
}
