"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormat = exports.handleError = exports.handleSend = exports.log = void 0;
const tools_config_1 = require("./tools.config");
const log = (title, discription) => {
    console.log(`${(0, tools_config_1.now)()} | [LOG] |TITLE: ${title} | DESCRIPTION: ${discription}`);
};
exports.log = log;
const handleSend = (data = [], discription = "Success", status = 1) => {
    return { status, data, message: discription };
};
exports.handleSend = handleSend;
const handleError = (title, error, discription = "ERROR", status = 0) => {
    console.log(`${(0, tools_config_1.now)()} | [ERROR] | TITLE: ${title} | ERROR: ${error} | DISCRIPTION: ${discription}`);
    return { status, message: discription };
};
exports.handleError = handleError;
const dateFormat = (utcDate) => {
    const timeOffset = 9 * 60;
    const localTimeOffset = new Date(utcDate).getTime() + timeOffset * 60 * 1000;
    return new Date(localTimeOffset);
};
exports.dateFormat = dateFormat;
//# sourceMappingURL=log.tools.config.js.map