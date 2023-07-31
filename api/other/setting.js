import request from "../../utils/request";

// APP版本配置
export function settingAppVersion() {
    return request({
        url: "/other/setting/appVersion",
        method: "get"
    });
}
// APP配置
export function settingApp() {
    return request({
        url: "/other/setting/app",
        method: "get"
    });
}

// 获取系统信息

export function getAppinfo() {
    return request({
        url: "/system/system_messages",
        method: "get"
    });
}

// 获取个人信息

export function getMineinfo() {
    return request({
        url: "/system/personal_messages",
        method: "get"
    });
}
// 收藏币对
export function favorite(data) {
    return request({
        url: "/strategy/favorite/",
        method: "post",
		 data: data,
    });
}

// 已收藏币对列表
export function getfavorite() {
    return request({
       url: "/strategy/favorites",
        method: "get"
    });
}


// 充值
export function rechar(data) {
    return request({
       url: "/system/deposit/address/",
        method: "get",
		params:data
    });
}


// 验证邮箱
export function checkEmaile(data) {
    return request({
       url: "/system/verify/email/code/",
        method: "post",
		params:data
    });
}


// 验证手机号

export function checkPhone(data) {
    return request({
       url: "/system/verify/sms/code/",
        method: "post",
		params:data
    });
}