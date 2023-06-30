"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOrder = exports.now = exports.makeObject = void 0;
const makeObject = (makeObject) => {
    return {
        status: status
    };
};
exports.makeObject = makeObject;
const now = () => {
    const nowDate = new Date;
    const setTimeZone = new Date(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000));
    return setTimeZone.toISOString().slice(0, 19).replace('T', ' ');
};
exports.now = now;
const arrayOrder = (key) => {
    return ((a, b) => {
        if (a[key] > b[key]) {
            return -1;
        }
        else if (a[key] < b[key]) {
            return 1;
        }
        return 0;
    });
};
exports.arrayOrder = arrayOrder;
//# sourceMappingURL=tools.config.js.map