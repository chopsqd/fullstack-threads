export const hasErrorField = (error: unknown): error is { data: { message: string } } => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data
    )
}
