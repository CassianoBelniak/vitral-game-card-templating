export default function getAdditionalArguments() {
    if (process.env.NODE_ENV === 'development') {
        return []
    }
    return [`--projectPath=${process.argv[1]?.replace(/\\/g, '/')}`]
}
