export default function extractVariablesFromText(text: string): string[] {
    const matches = text.replace(/\$\$+/g, ' ').match(/\$(\S+)/gm)

    return matches?.map(match => match.replace('$', '')) || []
}