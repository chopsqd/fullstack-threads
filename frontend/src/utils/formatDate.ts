export const formatDate = (date?: Date): string => {
    if (!date) {
        return ''
    }

    return new Date(date).toLocaleDateString()
}
