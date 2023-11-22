import { now, nowDate } from "./tools.config";

interface handleSend {
    data: string;
    discription: string;
}

interface HandleError {
    title: string;
    discription: string;
    error: any;
    status: number;
}

export const log = (title: string, discription: any): void => {
    console.log(`${nowDate()} | [LOG] |TITLE: ${title} | DESCRIPTION: ${discription}`)
}

export const handleSend = ( data: any = [], discription: string = "Success", status: number = 1): object => {
    return { status, data, message: discription }
}

export const handleError = (title: string, error: any, discription: string = "ERROR", status: number = 0): object => {
    console.log(`${nowDate()} | [ERROR] | TITLE: ${title} | ERROR: ${error} | DISCRIPTION: ${discription}`)
    return { status, message: discription }
}

export const dateFormat = (utcDate: Date): Date => {
    const timeOffset = 9 * 60; 
    const localTimeOffset = new Date(utcDate).getTime() + timeOffset * 60 * 1000;
  
    return new Date(localTimeOffset);
}