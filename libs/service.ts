import cache from "./cache"

function service(options:any = {}) {
    // 判断本地是否存在token，如果存在则带上请求头
    const token = options?.token?options.token : cache.get('token');
    if (token) {
        options.header = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    return new Promise((resolved, rejected) => {
        options.success = (response:any) => {
            // 如果请求回来的状态码不是200则执行以下操作
            if (response?.statusCode !== 200) {
                // 登陆失效
                if (response?.data?.errorCode === 401) {
                    // 清除本地token
                    cache.remove('token')
                    // 关闭所有页面返回到登录页

                }
                // 非成功状态码弹窗
                uni.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: response?.data?.errorMessage || response?.data?.error
                });
                // 返回错误信息
                rejected(response.data)
            } else {
                // 请求回来的状态码为200则返回内容
                resolved(response?.data?.data)
            }
        };
        options.fail = (error:any) => {
            // 请求失败弹窗
            uni.showToast({
                icon: 'none',
                duration: 3000,
                title: '服务器错误,请稍后再试'
            });
            rejected(error);
        };
        uni.request(options);
    });
}

export default service;
