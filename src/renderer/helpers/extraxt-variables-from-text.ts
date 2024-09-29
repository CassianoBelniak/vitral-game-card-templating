export default function extractVariablesFromText(text: string = ''): string[] {
    const matches = text.replace(/\$\$+/g, ' ').match(/\$([a-zA-Z0-9]+)/gm)

    return matches?.map((match) => match.replace('$', '')) || []
}
