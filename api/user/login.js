import request from "../../utils/request";

// 密码登录
export function byPwd(data) {
    return request({
        url: "/user/login/byPwd",
        method: "post",
        data: data
    });
}
// 微信公众号登录
export function byWeChatWap(data) {
    return request({
        url: "/user/login/byWeChatWap",
        method: "post",
        data: data
    });
}

// 登录
export function login(data) {
    return request({
        url: "/token/",
        method: "post",
        data: data
    });
}

// 登录
export function Register(data) {
    return request({
        url: "/system/user/register/",
        method: "post",
        data: data
    });
}
/**
 * 修改密码
 */
export function change_password(data) {
    return request({
        url: "/system/user/change_password/",
        method: "put",
        data
    });
}

