export default function isValidName(name: string) {
    return !name.match(/[/\\?%*:|"<>]/g)
}
