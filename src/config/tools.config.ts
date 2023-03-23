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

export const now = new Date().toISOString().slice(0, 19).replace('T', ' ');