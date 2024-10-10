export default function applyVariables(
    text: string,
    variables: { [key: string]: string } = {},
) {
    return text.replace(/{[^{}]*?}/gm, (match) => {
        return variables[match.replace(/{|}/g, '')] || ''
    })
}
