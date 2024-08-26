export default function applyVariables(
    text: string,
    variables: { [key: string]: string } = {},
) {
    return text.replace(/\$\S+/gm, (match) => {
        return variables[match.replace('$', '')] || ''
    })
}
