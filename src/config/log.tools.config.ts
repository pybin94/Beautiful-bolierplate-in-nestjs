import { now } from "./tools.config";

export const log = (title: string, discription: any): void => {
    console.log(`${now} | [LOG] |TITLE: ${title} | DESCRIPTION: ${discription}`)
}

export const handleSend = ( data: any, discription: string = "Success", status: number = 1): object => {
    return { status, data, message: discription }
}

export const handleError = (title: string, error: any, discription: string = "ERROR"): object => {
    console.log(`${now} | [ERROR] | TITLE: ${title} | ERROR: ${error}`)
    return { status: 0, message: discription }
}