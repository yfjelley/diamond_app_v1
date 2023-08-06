import request from "../../utils/request";

// 获取策略列表
export function getList(data) {
	return request({
		url: "/strategy/",
		method: "get"
	});
}

// 停止策略
export function stop(data) {
	return request({
		url: "/strategy/stop/",
		method: "post",
		data: data,
	});
}

// 启动策略
export function start(data) {
	return request({
		url: "/strategy/start/",
		method: "post",
		data: data,
	});
}

// 查看策略状态
export function checkstatus(data) {
	return request({
		url: "/strategy/status/",
		method: "post",
		data: data,
	});
}

// 创建网格策略
export function createGrid(data) {
	return request({
		url: "/strategy/contractgrid/",
		method: "post",
		data: data,
	});
}
// 创建定投策略
export function createSpot(data) {
	return request({
		url: "/strategy/spotdingtou/",
		method: "post",
		data: data,
	});
}


// 获取所有网格策略 有大于7天后小于7天的
export function getAllGridList() {
	return request({
		url: "/strategy/contract/strategies/",
		method: "get",
	});
}


// 获取交易币对
export function getSymbolList(data) {
	return request({
		url: "/strategy/symbols/",
		method: "get",
		data: data
	});
}

// 获取api
export function getApimode() {
	return request({
		url: "/strategy/apimode/",
		method: "get"
	});
}


// 现货定投策略
export function delespotD(id) {
	return request({
		url: `/strategy/spotdingtou/${id}/`,
		method: "delete",
	});
}

// 删除网格策略
export function deleGrid(id) {
	return request({
		url: `/strategy/contractgrid/${id}/`,
		method: "delete"
	});
}

// 获取智能网格参数
export function getGridSmart(data) {
	return request({
		url: `/strategy/contractgrid/smart/`,
		method: "get",
		data: data
	});
}

// 获取智能定投参数
export function getSpotSmart(data) {
	return request({
		url: `/strategy/spotdingtou/smart/`,
		method: "get",
		data: data
	});
}

// 查看网格参数
export function checkGrid(id) {
	return request({
		url: `/strategy/contractgrid/${id}/`,
		method: "get",
	});
}

// 查看定投参数
export function checkSpot(id) {
	return request({
		url: `/strategy/spotdingtou/${id}/`,
		method: "get",
	});
}

// 修改网格参数
export function reviseGrid(id, data) {
	return request({
		url: `/strategy/contractgrid/${id}/`,
		method: "patch",
		data: data
	});
}

// 修改定投参数
export function reviseSpot(id, data) {
	return request({
		url: `/strategy/spotdingtou/${id}/`,
		method: "patch",
		data: data
	});
}



// 获取仓位
export function getgran(data) {
	return request({
		url: `/strategy/position/`,
		method: "get",
		data: data
	});
}
// 获取已成交订单
export function getdeal(data) {
	return request({
		url: `/strategy/trade/fills/`,
		method: "get",
		data: data
	});
}

// 获取未成交订单
export function getnotdeal(data) {
	return request({
		url: `/strategy/openorder/`,
		method: "get",
		data: data
	});
}


export function getMinInfo() {
	return request({
		url: `/strategy/myquant/`,
		method: "get",
	})
}