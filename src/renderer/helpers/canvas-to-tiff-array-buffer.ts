/*!
	canvas-to-tiff version 1.0.0
	By Epistemex (c) 2015-2016
	www.epistemex.com
	MIT License (this header required)
*/

function toDataUrl(arrayBuffer: ArrayBuffer) {
    var buffer = new Uint8Array(arrayBuffer),
        blockSize = 1 << 20,
        block = blockSize,
        bs = '',
        base64 = '',
        i = 0,
        l = buffer.length

    // This is a necessary step before we can use btoa. We can
    // replace this later with a direct byte-buffer to Base-64 routine.
    // Will do for now, impacts only with very large bitmaps (in which
    // case toBlob should be used).
    function prepBase64() {
        while (i < l && block-- > 0) bs += String.fromCharCode(buffer[i++])

        if (i < l) {
            block = blockSize
            return prepBase64()
        } else {
            // convert string to Base-64
            i = 0
            l = bs.length
            block = 180000 // must be divisible by 3

            function toBase64() {
                base64 += btoa(bs.substr(i, block))
                i += block
                if (i < l) {
                    return toBase64()
                } else {
                    return base64
                }
            }
            return toBase64()
        }
    }
    return prepBase64()
}

export default function canvasToTiffArrayBuffer(
    canvas: HTMLCanvasElement,
    options: { dpi: number; littleEndian: boolean },
) {
    let w = canvas.width
    let h = canvas.height
    let offset = 0
    let iOffset = 258 // todo calc based on offset field length, add to final offset when compile
    let entries = 0
    let offsetList: number[] = []
    let sid = '\x63\x61\x6e\x76\x61\x73\x2d\x74\x6f\x2d\x74\x69\x66\x66\x20\x30\x2e\x34\0'
    let idfOffset = 0
    let lsb = !!options.littleEndian
    let dpiX = +(options.dpi || 96) | 0
    let dpiY = +(options.dpi || 96) | 0
    let idata = canvas.getContext('2d')!.getImageData(0, 0, w, h)
    let length = idata.data.length
    let fileLength = iOffset + length
    let file = new ArrayBuffer(fileLength)
    let file8 = new Uint8Array(file)
    let view = new DataView(file)
    let pos = 0
    let date = new Date()
    let dateSt

    // Header
    set16(lsb ? 0x4949 : 0x4d4d) // II or MM
    set16(42) // magic 42
    set32(8) // offset to first IFD

    // IFD
    addIDF() // IDF start
    addEntry(0xfe, 4, 1, 0) // NewSubfileType
    addEntry(0x100, 4, 1, w) // ImageWidth
    addEntry(0x101, 4, 1, h) // ImageLength (height)
    addEntry(0x102, 3, 4, offset, 8) // BitsPerSample
    addEntry(0x103, 3, 1, 1) // Compression
    addEntry(0x106, 3, 1, 2) // PhotometricInterpretation: RGB
    addEntry(0x111, 4, 1, iOffset, 0) // StripOffsets
    addEntry(0x115, 3, 1, 4) // SamplesPerPixel
    addEntry(0x117, 4, 1, length) // StripByteCounts
    addEntry(0x11a, 5, 1, offset, 8) // XResolution
    addEntry(0x11b, 5, 1, offset, 8) // YResolution
    addEntry(0x128, 3, 1, 2) // ResolutionUnit: inch
    addEntry(0x131, 2, sid.length, offset, getStrLen(sid)) // sid
    addEntry(0x132, 2, 0x14, offset, 0x14) // Datetime
    addEntry(0x152, 3, 1, 2) // ExtraSamples
    endIDF()

    // Fields section > long ---------------------------

    // BitsPerSample (2x4), 8,8,8,8
    set32(0x00080008)
    set32(0x00080008)

    // StripOffset to bitmap data
    //set32(iOffset);

    // StripByteCounts
    //set32(length);

    // XRes PPI
    set32(dpiX)
    set32(1)

    // YRes PPI
    set32(dpiY)
    set32(1)

    // sid
    setStr(sid)

    // date
    let dateStr =
        date.getFullYear() + ':' + pad2(String(date.getMonth() + 1)) + ':' + pad2(String(date.getDate())) + ' '
    dateStr +=
        pad2(String(date.getHours())) + ':' + pad2(String(date.getMinutes())) + ':' + pad2(String(date.getSeconds()))
    setStr(dateStr)

    // Image data here (todo if very large, split into block based copy)
    file8.set(idata.data, iOffset)

    function pad2(str: string) {
        str += ''
        return str.length === 1 ? '0' + str : str
    }

    // helper method to move current buffer position
    function set16(data: number) {
        view.setUint16(pos, data, lsb)
        pos += 2
    }

    function set32(data: number) {
        view.setUint32(pos, data, lsb)
        pos += 4
    }

    function setStr(str: string) {
        var i = 0
        while (i < str.length) view.setUint8(pos++, str.charCodeAt(i++) & 0xff)
        if (pos & 1) pos++
    }

    function getStrLen(str: string) {
        var l = str.length
        return l & 1 ? l + 1 : l
    }

    function addEntry(tag: number, type: number, count: number, value: number, dltOffset: number = 0) {
        set16(tag)
        set16(type)
        set32(count)

        if (dltOffset) {
            //if (tag === 0x111) iOffsetPtr = pos;
            //iOffset += dltOffset;
            offset += dltOffset
            offsetList.push(pos)
        }

        if (count === 1 && type === 3 && !dltOffset) {
            set16(value)
            set16(0) // pad
        } else {
            set32(value)
        }

        entries++
    }

    function addIDF() {
        idfOffset = pos
        pos += 2
    }

    function endIDF() {
        view.setUint16(idfOffset, entries, lsb)
        set32(0)

        var delta = 14 + entries * 12 // 14 = offset to IDF (8) + IDF count (2) + end pointer (4)

        // compile offsets
        for (var i = 0, p, o; i < offsetList.length; i++) {
            p = offsetList[i]
            o = view.getUint32(p, lsb)
            view.setUint32(p, o + delta, lsb)
        }

        //view.setUint32(iOffsetPtr, iOffset + delta, lsb);
    }

    return toDataUrl(file)
}
