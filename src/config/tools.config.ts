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

export const nowDate = () => {
    const nowDate = new Date
    const setTimeZone = new Date(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000)) // Asia/Seoul
    return setTimeZone.toISOString().slice(0, 19).replace('T', ' ');
}

export const dateFormat = (utcDate: Date | string): Date => {
    const timeOffset = 9 * 60; 
    const localTimeOffset = new Date(utcDate).getTime() + timeOffset * 60 * 1000;
    return new Date(localTimeOffset);
}
