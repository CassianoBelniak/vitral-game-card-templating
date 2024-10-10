export default function extractVariablesFromText(text: string = ''): string[] {
    const matches = text.replace(/(\\{)|(\\})/g, ' ').match(/{.*?}/gm)

    return matches?.map((match) => match.replace(/[{}]/g, '')) || []
}


