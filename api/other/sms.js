import request from "../../utils/request";

// 发送短信
export function smsSend(data) {
    return request({
        url: "/system/send/sms",
        method: "post",
        data: data,
    });
}