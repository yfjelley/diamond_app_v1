import request from "../../utils/request";

// 查看所有api
export function getApiList(data) {
    return request({
        url: "/strategy/apimode/",
        method: "get",
    });
}

// 板顶所有api
export function bindApiList(data) {
    return request({
        url: "/strategy/apimode/",
        method: "post",
        data: data,
    });
}
// 删除api
export function deleteApiList(data) {
    return request({
        url: `/strategy/apimode/${data}/`,
        method: "delete",
    });
}
// 更新？
export function addApiList(data) {
    return request({
        url: "/strategy/apimode/",
        method: "patch",
        data: data,
    });
}