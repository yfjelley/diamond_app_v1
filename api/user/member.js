import request from "../../utils/request";

// 获取登录的用户信息
export function loginInfo() {
    return request({
        url: "/user/member/loginInfo",
        method: "get"
    });
}

// 获取登录的用户信息
export function getMineBalance() {
    return request({
        url: "/system/diamond/balance",
        method: "get"
    });
}


// 获取用户个人信息
export function getUserInfo() {
    return request({
        url: "/system/user/info/",
        method: "get"
    });
}

// 修改个人信息

export function setUserInfo(data) {
    return request({
        url: "/system/user/update_info/",
        method: "put",
		data:data
    });
}
