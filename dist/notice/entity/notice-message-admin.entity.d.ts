import { NoticeMessageBroadcastAdmin } from "./notice-message-boradcast-admin.entity";
export declare class NoticeMessageAdmin {
    id: number;
    siteId: number;
    sendId: number;
    receiveId: number;
    title: string;
    contents: string;
    comments: string;
    status: number;
    isBroadcast: number;
    createdAt: Date;
    updatedAt: Date;
    noticeMessageBroadcastAdmin: NoticeMessageBroadcastAdmin[];
}
