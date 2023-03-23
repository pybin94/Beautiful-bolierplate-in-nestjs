import { now } from "./tools.config";

export const log = (title: string, discription: any): void => {
    console.log(`${now} | [LOG] |TITLE: ${title} | DESCRIPTION: ${discription}`)
}

export const handleError = (title: string, error: any, discription: string = "오류가 발생했습니다."): object => {
    console.log(`${now} | [ERROR] | TITLE: ${title} | ERROR: ${error}`)
    return { status:0, message: discription }
}