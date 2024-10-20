export function getValueAmmount(value: string) {
    return value.replace(/(px$|in$|mm$|%$)/, '')
}

export function getValueUnit(value: string) {
    return value.match(/(px$|in$|mm$|%$)/)?.[0] || ''
}

export function removeInvalidChars(value: string) {
    return value.replace(/[^}]+(?![^{]*\})/g, (match: string) => match.replace(/[^\d\-.+^/()*]/g, ''))
}
