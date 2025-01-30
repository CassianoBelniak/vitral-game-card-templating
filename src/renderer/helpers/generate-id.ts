export default function generateId() {
    return Math.random().toString(36).substring(2, 18)
}
