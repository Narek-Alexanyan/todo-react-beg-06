export default function idGenerator() {
    return '_' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
}