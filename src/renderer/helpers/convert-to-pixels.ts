function mmToPixels(mm: number, ppi: number) {
    const mmPerInch = 25.4
    const inches = mm / mmPerInch
    const pixels = inches * ppi
    return pixels
}

function cmToPixels(cm: number, ppi: number) {
    const cmPerInch = 2.54
    const inches = cm / cmPerInch
    const pixels = inches * ppi
    return pixels
}

function inchesToPixels(inches: number, ppi: number) {
    const pixels = inches * ppi
    return pixels
}

export default function convertToPixels(size: string, ppi: number) {
    if (!size) {
        return 0
    }
    if (size.includes('mm')) {
        return mmToPixels(parseFloat(size.replace('mm', '')), ppi) || 0
    } else if (size.includes('cm')) {
        return cmToPixels(parseFloat(size.replace('cm', '')), ppi) || 0
    } else if (size.includes('in')) {
        return inchesToPixels(parseFloat(size.replace('in', '')), ppi) || 0
    } else if (size.includes('px')) {
        return parseFloat(size.replace('px', '')) || 0
    } else if (size.match(/^[\d-]+$/)) {
        return parseFloat(size) || 0
    }
    throw new Error('Unsupported size format')
}
