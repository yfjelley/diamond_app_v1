// K线数据
var rawData = [
	["2004-01-05", 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
	["2004-01-06", 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
	["2004-01-07", 10535.46, 10529.03, 10432.12, 10587.55, 225490000],
	["2004-01-08", 10530.07, 10592.44, 10480.59, 10651.99, 237770000],
	["2004-01-09", 10589.25, 10458.89, 10420.52, 10603.48, 223250000],
	["2004-01-12", 10461.55, 10485.18, 10389.85, 10543.03, 197960000],
	["2004-01-13", 10485.18, 10427.18, 10341.19, 10539.25, 197310000],
	["2004-01-14", 10428.67, 10538.37, 10426.89, 10573.85, 186280000],
	["2004-01-15", 10534.52, 10553.85, 10454.52, 10639.03, 260090000],
	["2004-01-16", 10556.37, 10600.51, 10503.71, 10666.88, 254170000],
	["2004-01-20", 10601.42, 10528.66, 10447.92, 10676.96, 224300000],
	["2004-01-21", 10522.77, 10623.62, 10453.11, 10665.72, 214920000],
	["2004-01-22", 10624.22, 10623.18, 10545.03, 10717.41, 219720000],
	["2004-01-23", 10625.25, 10568.29, 10490.14, 10691.77, 234260000],
	["2004-01-26", 10568.12, 10702.51, 10510.44, 10725.18, 186170000],
	["2004-01-27", 10701.11, 10609.92, 10579.33, 10748.81, 206560000],
	["2004-01-28", 10610.07, 10468.37, 10412.44, 10703.25, 247660000],
	["2004-01-29", 10467.41, 10510.29, 10369.92, 10611.56, 273970000],
	["2004-01-30", 10510.22, 10488.07, 10385.56, 10551.03, 208990000],
	["2004-02-02", 10487.78, 10499.18, 10395.55, 10614.44, 224800000],
	["2004-02-03", 10499.48, 10505.18, 10414.15, 10571.48, 183810000],
	["2004-02-04", 10503.11, 10470.74, 10394.81, 10567.85, 227760000],
	["2004-02-05", 10469.33, 10495.55, 10399.92, 10566.37, 187810000],
	["2004-02-06", 10494.89, 10593.03, 10433.74, 10634.81, 182880000],
	["2004-02-09", 10592.41, 10579.03, 10433.72, 10634.81, 160720000],
	["2004-02-10", 10578.74, 10613.85, 10511.18, 10667.03, 160590000],
	["2004-02-11", 10605.48, 10737.72, 10561.55, 10779.41, 277850000],
	["2004-02-12", 10735.18, 10694.07, 10636.44, 10775.03, 197560000],
	["2004-02-13", 10696.22, 10627.85, 10578.66, 10755.47, 208340000],
	["2004-02-17", 10628.88, 10714.88, 10628.88, 10762.07, 169730000],
	["2004-02-18", 10706.68, 10671.99, 10623.62, 10764.36, 164370000],
	["2004-02-19", 10674.59, 10664.73, 10626.44, 10794.95, 219890000],
	["2004-02-20", 10666.29, 10619.03, 10559.11, 10722.77, 220560000],
	["2004-02-23", 10619.55, 10609.62, 10508.89, 10711.84, 229950000],
	["2004-02-24", 10609.55, 10566.37, 10479.33, 10681.41, 225670000],
	["2004-02-25", 10566.59, 10601.62, 10509.42, 10660.73, 192420000],
	["2004-02-26", 10598.14, 10580.14, 10493.71, 10652.96, 223230000],
	["2004-02-27", 10581.55, 10583.92, 10519.03, 10689.55, 200050000],
];
var dates = rawData.map(function(item) {
	return item[0];
});
var data = rawData.map(function(item) {
	return [+item[1], +item[2], +item[3], +item[4], +item[5]];
});
var volumes = rawData.map(function(item, index) {
	return [index, item[5], item[1] > item[2] ? 1 : -1];
});

// 交易统计数
// 获取指定区间随机数
function sum (m,n){
　　var num = Math.floor(Math.random()*(m - n) + n);
	return num;
}
// 深度数据
var depthList=function(){
	let obj={
		buyList:[],
		sellList:[]
	};
	for(let i=0;i<20;i++){
		obj.buyList.push({
			"price": 0.988,
			"amount": 12,
			'width':sum(1,100)
		})
		obj.sellList.push({
			"price": 0.252,
			"amount": 15,
			'width':sum(1,100)
		})
	}
	return obj;
}

// 成交列表
var dealHis=function(){
	let arr=[];
	for(let i =0;i<20;i++){
		arr.push({
			"date": "07-22 16:27:44",
			// 1买入 2卖出
			"takerFlag": "1",
			"price": 44,
			"amount": 444
		})
	}
	return arr;
}
// 项目信息
var tokenInfo={
		"tokenName": "XXX",
		// 发行时间
		"issueDate": "2020-06-15",
		// 发行总量
		"totalSupply": "1000000000",
		// 流通总量
		"nowSupply": "--",
		// 众筹价格
		"price": "--",
		// 白皮书地址
		"whitePaper": "--",
		// 官网
		"webSite": "--",
		// 区块查询
		"exploereSite": "--",
		// 简介
		"remark": "--"
}
