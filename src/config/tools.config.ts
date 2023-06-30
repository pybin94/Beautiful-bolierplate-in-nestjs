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

export const arrayOrder = (key: string) => {
    return ((a: any, b: any) => {
        if (a[key] > b[key]) {    
            return -1;    
        } else if (a[key] < b[key]) {    
            return 1;    
        }
        return 0;    
    })
}