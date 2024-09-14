export default function applyVariables(
    text: string,
    variables: { [key: string]: string } = {},
) {
    return text.replace(/\$[a-zA-Z0-9]+/gm, (match) => {
        return variables[match.replace('$', '')] || ''
    })
}
