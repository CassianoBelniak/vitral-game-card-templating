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
    bottomMargin: number
    topMargin: number
    leftMargin: number
    rightMargin: number
}

interface Line {
    text: string
    y: number
    length: number
}

function createCanvas() {
    const canvas = document.createElement('canvas')
    return canvas
}

function getContext(canvas: HTMLCanvasElement, font: string, fontSize: number) {
    const ctx = canvas.getContext('2d')!
    ctx.font = `${fontSize}px '${font}'`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    return ctx
}

function getPureText(text: string) {
    return text
        .replace(/</g, '@@minus')
        .replace(/>/g, '@@more')
        .replace(/\[/g, '@@brack-start')
        .replace(/]/g, '@@brack-end')
        .replace(/>/g, '')
        .replace(/</g, '')
        .replace(/[.*?]]/g, '')
        .replace(/@@minus/g, '<')
        .replace(/@@more/g, '>')
        .replace(/@@brack-start/g, '[')
        .replace(/@@brack-end/g, ']')
}

function getLineOffset(lineWidth: number, rectWidth: number, alignment: string) {
    if (alignment === 'left') return 0
    if (alignment === 'right') return rectWidth - lineWidth
    return rectWidth / 2 - lineWidth / 2
}

function getCanvasOffset(
    canvasHeight: number,
    textHeight: number,
    alignment: string,
    topMargin: number,
    bottomMargin: number,
) {
    if (alignment === 'top') return 0 + topMargin
    if (alignment === 'bottom') return canvasHeight - textHeight - bottomMargin
    return canvasHeight / 2 - textHeight / 2
}

export function getTextCanvas(options: DrawOptions) {
    const canvas = createCanvas()
    const lines = calculateLines(canvas, options)
    const contentHeight = lines.length * options.lineHeight
    const canvasHeight = options.height || contentHeight
    canvas.width = options.width
    canvas.height = canvasHeight
    const ctx = getContext(canvas, options.font, options.fontSize)
    let y = getCanvasOffset(canvasHeight, contentHeight, options.verticalAlign, options.topMargin, options.bottomMargin)
    for (const line of lines) {
        const textSize = ctx.measureText(getPureText(line))
        const lineWidth = textSize?.width ?? 0
        const lineOffset = getLineOffset(lineWidth, options.width, options.alignment)
        drawLine(ctx, line, lineOffset, y, options.isFilled, options.color, options.tooltipColor)
        y += options.lineHeight
    }
    return canvas
}

function calculateLines(canvas: HTMLCanvasElement, options: DrawOptions) {
    const ctx = getContext(canvas, options.font, options.fontSize) //Getting ctx here cause ctx is resetted after canvas resize, so no point in reusing the same ctx
    const lines: string[] = []
    let line = ''
    const words = getWords(options.text)

    for (const word of words) {
        const linePlus = line + word + ' '
        if (ctx.measureText(getPureText(linePlus)).width > options.width) {
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
    for (const char of getChars(line)) {
        if (char === 'startTooltip') {
            ctx.fillStyle = tooltipColor!
        } else if (char === 'endTooltip') {
            ctx.fillStyle = color!
        } else if (char.includes('icon')) {
            // draw icon
        } else {
            drawChar(ctx, char, xCursor, y, isFilled)
            xCursor += ctx.measureText(char).width
        }
    }
}

function getChars(line: string) {
    const chars = []
    let isNextSpecial = false
    let isColleting = false
    let collector = ''
    for (let c = 0; c < line.length; c++) {
        const char = line.charAt(c)
        if (isColleting) {
            collector += char
        } else if (char === '\\') {
            isNextSpecial = true
        } else if (isNextSpecial) {
            chars.push(char)
            isNextSpecial = false
        } else if (char === '<') {
            chars.push('startTooltip')
        } else if (char === '>') {
            chars.push('endTooltip')
        } else if (char === '[') {
            isColleting = true
        } else if (char === ']') {
            isColleting = false
            chars.push(`icon=${collector}`)
            collector = ''
        } else {
            chars.push(char)
        }
    }
    return chars
}

function getWords(text: string) {
    return text.split(' ')
}
