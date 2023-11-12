export const requiredLastName = (v: string) => {
    return !!v || '姓は必須です'
}

export const requiredFirstName = (v: string) => {
    return !!v || '名は必須です'
}

export const requiredEmail = (v: string) => {
    return !!v || 'Eメールは必須です'
}

export const validEmail = (v: string) => {
    return /.+@.+/.test(v) || '有効なEメールアドレスを入力してください';
}

export const requiredPassword = (v: string) => {
    return !!v || 'パスワードは必須です'
}

export const requiredConfirmPassword = (v: string) => {
    return !!v || '確認用パスワードは必須です'
}

export const validPasswordMatch = (v: string, password: string) => {
    return v === password || 'パスワードが一致しません'
}