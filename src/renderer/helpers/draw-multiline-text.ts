import { imagesStore } from '../stores/images-store.js'

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

export function getTextSize(options: DrawOptions) {
    const canvas = createCanvas()
    const lines = calculateLines(canvas, options)
    const contentHeight = lines.length * options.lineHeight
    const canvasHeight = options.height || contentHeight
    return {
        width: options.width || getLargestLineSize(canvas, options, lines),
        height: canvasHeight,
    }
}

export function getTextCanvas(options: DrawOptions) {
    const canvas = createCanvas()
    const lines = calculateLines(canvas, options)
    const contentHeight = lines.length * options.lineHeight
    const canvasHeight = options.height || contentHeight + options.bottomMargin + options.topMargin
    canvas.width = options.width || getLargestLineSize(canvas, options, lines)
    canvas.height = canvasHeight
    const ctx = getContext(canvas, options.font, options.fontSize)
    let y = getCanvasOffset(canvasHeight, contentHeight, options.verticalAlign, options.topMargin, options.bottomMargin)
    const state = {
        isBold: false,
        isItalic: false,
    }
    for (const line of lines) {
        const textSize = measureText(line, ctx, options.lineHeight)
        const lineOffset = getLineOffset(textSize, canvas.width, options.alignment)
        const newState = drawLine(
            ctx,
            line,
            lineOffset,
            y,
            options.isFilled,
            options.color,
            options.tooltipColor,
            options.lineHeight,
            options.font,
            options.fontSize,
            state,
        )
        Object.assign(state, newState)
        y += options.lineHeight
    }
    return canvas
}

function measureText(line: string[], ctx: CanvasRenderingContext2D, lineHeight: number) {
    let size = 0
    for (const char of line) {
        if (char.length === 1) {
            size += ctx.measureText(char).width
        } else if (char.includes('icon')) {
            const iconName = char.replace('icon=', '')
            const width = getIconWidth(iconName, lineHeight)
            size += width
        }
    }
    return size
}

function getLargestLineSize(canvas: HTMLCanvasElement, options: DrawOptions, lines: string[][]) {
    const ctx = getContext(canvas, options.font, options.fontSize)
    let largestLineSize = 0
    for (const line of lines) {
        const size = measureText(line, ctx, options.lineHeight)
        largestLineSize = Math.max(size, largestLineSize)
    }
    return largestLineSize
}

function isVisibleChar(char: string) {
    return char !== ' ' && char.length === 1
}

function trimSpaces(line: string[]) {
    if (line[0] === ' ') {
        line.shift()
    }
    if (line.at(-1) === ' ') {
        line.pop()
    }
}

function calculateLines(canvas: HTMLCanvasElement, options: DrawOptions) {
    const ctx = getContext(canvas, options.font, options.fontSize) //Getting ctx here cause ctx is resetted after canvas resize, so no point in reusing the same ctx
    const lines: string[][] = []
    let line: string[] = []
    let word: string[] = []
    const chars = getChars(options.text)

    const width = options.width || Infinity

    for (const char of chars) {
        if (char === '\n') {
            line.push(...word)
            lines.push(line)
            word = []
            line = []
        } else if (isVisibleChar(char)) {
            word.push(char)
        } else if (char === ' ') {
            if (measureText([...line, ...word], ctx, options.lineHeight) > width) {
                trimSpaces(line)
                lines.push(line)
                line = word
            } else {
                line.push(...word)
            }
            word = []
            line.push(char)
        } else if (['startTooltip', 'endTooltip', 'toogleBold', 'toogleItalic'].includes(char)) {
            word.push(char)
        } else if (char.includes('icon=')) {
            if (measureText([...line, ...word, char], ctx, options.lineHeight) > width) {
                lines.push(line)
                line = [...word, char]
                word = []
            } else {
                word.push(char)
            }
        }
    }

    trimSpaces(line)

    if (measureText([...line, ...word], ctx, options.lineHeight) > width) {
        lines.push(line)
        lines.push(word)
    } else {
        if (line.length) {
            line.push(' ')
        }
        line.push(...word)
        lines.push(line)
    }
    return lines
}

function drawChar(ctx: CanvasRenderingContext2D, char: string, x: number, y: number, isFilled: boolean): void {
    if (isFilled) {
        ctx.fillText(char, x, y)
    } else {
        ctx.strokeText(char, x, y)
    }
}

function getStyle(font: string, fontSize: number, isBold: boolean, isItalic: boolean) {
    let style = ''
    if (isItalic) {
        style += 'italic '
    }
    if (isBold) {
        style += 'bold '
    }
    return style + `${fontSize}px '${font}'`
}

function drawLine(
    ctx: CanvasRenderingContext2D,
    line: string[],
    x: number,
    y: number,
    isFilled: boolean,
    color: string,
    tooltipColor: string,
    lineHeight: number,
    font: string,
    fontSize: number,
    previousLineState: { isBold: boolean; isItalic: boolean },
) {
    let xCursor = x
    let isBold = previousLineState.isBold
    let isItalic = previousLineState.isItalic
    ctx.font = getStyle(font, fontSize, isBold, isItalic)
    for (const char of line) {
        if (char === 'startTooltip') {
            ctx.fillStyle = tooltipColor!
        } else if (char === 'endTooltip') {
            ctx.fillStyle = color!
        } else if (char === 'toogleBold') {
            isBold = !isBold
            ctx.font = getStyle(font, fontSize, isBold, isItalic)
        } else if (char === 'toogleItalic') {
            isItalic = !isItalic
            ctx.font = getStyle(font, fontSize, isBold, isItalic)
        } else if (char.includes('icon')) {
            const iconName = char.replace('icon=', '')
            const icon = imagesStore.images[iconName]
            const width = getIconWidth(iconName, lineHeight)
            if (icon) {
                ctx.drawImage(icon.image, xCursor, y, width, lineHeight)
            }
            xCursor += width
        } else {
            drawChar(ctx, char, xCursor, y, isFilled)
            xCursor += ctx.measureText(char).width
        }
    }
    return {
        isBold,
        isItalic,
    }
}

function getIconWidth(iconName: string, height: number) {
    const icon = imagesStore.images[iconName]
    if (!icon) return 0
    const ratio = icon.image.height / height
    return icon.image.width / ratio
}

function getChars(line: string) {
    const chars = []
    let isNextSpecial = false
    let isColleting = false
    let collector = ''
    for (let c = 0; c < line.length; c++) {
        const char = line.charAt(c)
        if (isColleting) {
            if (char === ']') {
                isColleting = false
                chars.push(`icon=${collector}`)
                collector = ''
            } else {
                collector += char
            }
        } else if (char === '\\') {
            isNextSpecial = true
        } else if (isNextSpecial) {
            chars.push(char)
            isNextSpecial = false
        } else if (char === '<') {
            chars.push('startTooltip')
        } else if (char === '>') {
            chars.push('endTooltip')
        } else if (char === '*') {
            chars.push('toogleBold')
        } else if (char === '_') {
            chars.push('toogleItalic')
        } else if (char === '[') {
            isColleting = true
        } else if (char === '\n') {
            chars.push(' ', '\n') // Kinda hacky but simpliflies the code cause we dont need to measure the word when breaking lines
        } else {
            chars.push(char)
        }
    }
    return chars
}
