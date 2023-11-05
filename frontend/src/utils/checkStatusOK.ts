export const checkStatusOK = (statusCode: number) => {
    return statusCode >= 200 && statusCode < 300
}