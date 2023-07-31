import request from "../../utils/request";

// 发送邮件
export function emailSend(data) {
    return request({
        url: "/system/send/email/",
        method: "post",
        data: data,
    });
}

// 邮箱验证
export function checkEmail(data) {
    return request({
        url: "/system/send/email/",
        method: "post",
        data: data,
    });
}