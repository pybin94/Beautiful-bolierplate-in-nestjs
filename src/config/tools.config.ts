interface MakeObject {
    status: number,
    message: string,
    data: object
}

export const makeObject = (makeObject: MakeObject) => {
    return {
        status: status
    }
}

export const now = () => {
    const nowDate = new Date
    const setTimeZone = new Date(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000)) // Asia/Seoul
    return setTimeZone.toISOString().slice(0, 19).replace('T', ' ');
}
