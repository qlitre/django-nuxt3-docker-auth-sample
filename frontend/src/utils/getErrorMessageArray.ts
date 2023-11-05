export const getErrorMessageArray = (errorBody: any) => {
    // 配列の場合はそのまま返す
    const ret: string[] = []
    if (Array.isArray(errorBody)) {
        for (const error of errorBody) {
            ret.push(error)
        }
        return ret
    }
    // オブジェクトの場合は、各キーの配列を結合して返す
    for (const key in errorBody) {
        const messages: string[] = errorBody[key]
        for (const message of messages) {
            ret.push(message)
        }
    }
    return ret
}