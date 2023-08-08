var myChart;
var miniChart
var type = localStorage.getItem('detail-type')
var period = '1m'
var met = 'MA'
console.log(type);
// post请求封装
// function post(url,data) {
// 	let baseUrl='http://192.168.3.135:8080';
// 	return new Promise((resolve,reject)=>{
// 		axios({
// 			headers:{
// 				"Content-Type": "application/x-www-form-urlencoded",
// 			},
// 			method:'post',
// 			url:baseUrl+url,
// 			data:Qs.stringify( data || {})
// 		})
// 		.then(res=>{
// 			console.log(res)
// 			if(res.data.code==1){
// 				resolve(res.data)
// 			}else{
// 				reject()
// 				alertError('请求超时')
// 			}
// 		})
// 		.catch(err=>{
// 			alertError('请求超时')
// 		})
// 	})
// }
// 弹窗
function alertError(title) {
	document.addEventListener('plusready', function() {
		console.log('......')
	})
	try {
		plus.nativeUI.toast(title, {
			icon: '/static/common/toast-error.png',
			style: 'inline',
			verticalAlign: 'top'
		});
	} catch (e) {
		//TODO handle the exception
	}
}
var app = new Vue({
	el: '#app',
	data: {
		MA5: '',
		MA10: '',
		MA30: '',
		volMA5: '',
		rawData: [],
		volMA10: '',
		current: '1m',
		typecurrent: 1,
		tabs: [{
				'label': '1分钟',
				'value': '1m',
			},
			{
				'label': '5分钟',
				'value': '5m'
			},
			{
				'label': '30分钟',
				'value': '30m'
			},
			{
				'label': '1小时',
				'value': '1H'
			},
			{
				'label': '6小时',
				'value': '6H'
			}, {
				'label': '12小时',
				'value': '12H'
			}, {
				'label': '指标',
				'value': 7
			}
		],
		tabs1: [{
				'label': '1分钟',
				'value': '1m',
			},
			{
				'label': '5分钟',
				'value': '5m'
			},
			{
				'label': '30分钟',
				'value': '30m'
			},
			{
				'label': '1小时',
				'value': '1H'
			},
			{
				'label': '6小时',
				'value': '6H'
			}
		],
		category: 1,
		categoryList: [{
				'label': '委托',
				'value': 1
			},
			{
				'label': '成交',
				'value': 2
			},
			{
				'label': '指标',
				'value': 3
			},
		],
		txData: {}, // 交易统计数据
		buyList: [],
		sellList: [],
		dealHis: [],
		page: 1,
		dealHistemp: [],
		depthList: [],
		metstatus: false,
		metlist1: ['MA', 'EMA', 'BOLL', 'SAR', 'TD'],
		metlist2: ['VOLUME', 'MACD', 'KDJ', 'RSI', 'CCI', 'WR', 'OBV', 'TRIX'],
		selectlist: [{
				'label': 'MA',
				'value': 1
			},
			{
				'label': 'EMA',
				'value': 2
			},
			{
				'label': 'BOLL',
				'value': 3
			},
			{
				'label': 'SAR',
				'value': 4
			},
			{
				'label': 'VOLUME',
				'value': 5
			},
			{
				'label': 'MACD',
				'value': 6
			},
			{
				'label': 'MACD',
				'value': 7
			}
		],
		dealTyleList: [{
				text: '卖出',
				num: 10
			},
			{
				text: "中立",
				num: 10
			},
			{
				text: "卖出",
				num: 10
			}
		],
		shocklist: [{
			name: 'CCI(20)',
			num: 52.02,
			msg: '买入'
		}, {
			name: 'CCI(20)',
			num: 52.02,
			msg: '买入'
		}, {
			name: 'CCI(20)',
			num: 52.02,
			msg: '买入'
		}],
		move: {
			leftlist: [{
					name: "MA10",
					msg: '买入',
					num: 28911
				},
				{
					name: "MA10",
					msg: '买入',
					num: 28911
				}
			],
			rightlist: [{
					name: "MA10",
					msg: '买入',
					num: 28911
				},
				{
					name: "MA10",
					msg: '买入',
					num: 28911
				}
			]
		},
		loading: true,

	},
	created() {
		this.init().then(res => {
			this.getTxData()
			this.getDepth()
		})
	},
	mounted() {
		myChart = echarts.init(document.getElementById('main'));
		this.init().then(res => {
			this.draw()
			this.getKline()
		})
	},
	methods: {
		select(item) { // 副图切换
			this.typecurrent = item
		},
		mackclick(e) {
			// console.log(e.target.parentNode);
			this.metstatus = false
			// console.log(event.target &&event.navigation.contains(event.target));
		},
		tabclick(item) {
			console.log(item);
		},
		fomatFloat(num, n) {
			var f = parseFloat(num);
			if (isNaN(f)) {
				return false;
			}
			f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂   
			var s = f.toString();
			var rs = s.indexOf('.');
			//判定如果是整数，增加小数点再补0
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + n) {
				s += '0';
			}
			return s;
		},
		formatNumber(number) {
			if (number >= 10000) {
				const quotient = Math.floor(number / 10000);
				const remainder = number % 10000;

				// 使用toFixed方法将小数部分保留两位小数
				const formattedNumber = remainder === 0 ? `${quotient}万` :
					`${quotient}.${(remainder / 1000).toFixed(2).substring(2)}万`;
				return formattedNumber;
			} else {
				return number.toLocaleString();
			}
		},
		metLcick(item) {
			console.log(item);
		},
		async init() {
			this.loading = true
			return new Promise(resolve => {
				let that = this
				var socket = new WebSocket("ws://8.217.204.77:9000/ws/ticker/");
				// 在连接建立后发送一个订阅消息
				socket.onopen = function(event) {
					// Subscribe to multiple groups and symbols
					var subscribeMessage = {
						action: "subscribe",
						subscriptions: [{
								group: 'kline',
								symbols: [type], // 替换为你想要的符号
								period: period // k线图的周期，可以是 '12H', '6H', '4H', '2H', '1H', '30m', '15m', '5m', '3m', '1m'
							},
							{
								group: 'trade',
								symbols: [type] // 替换为你想要的符号
							},
							{
								group: 'dept',
								symbols: [type] // 订阅永续合约ape-usdt-swap 深度数据
							},
							{
								group: 'ticker',
								symbols: ["swap"] // 订阅永续合约的
							},
							{
								group: 'ticker',
								symbols: ["spot"] // 订阅现货的
							},
						]
					};
					socket.send(JSON.stringify(subscribeMessage));

				};

				socket.onmessage = function(event) {
					if (!JSON.parse(event.data).event) {
						var detail = JSON.parse(event.data)
						if (detail.data['instId']) {
							var obj = JSON.parse(event.data).data
							that.dealHistemp.push({
								date: that.timestampToDate(Number(obj.ts)),
								takerFlag: obj.side == 'buy' ? 1 : 2,
								price: obj.px,
								amount: obj.sz,
								tradeId: obj.tradeId
							})
							that.dealHis = that.filterArray(that.dealHistemp, 'date')
						} else if (detail.data['asks']) {
							var obj = JSON.parse(event.data).data
							if (Array.isArray(obj.asks) && Array.isArray(obj.bids)) {
								that.depthList = {
									buyList: obj.asks || [],
									sellList: obj.bids || []
								}
							}
						} else if (detail.data.symbol == type) {
							var obj = JSON.parse(event.data).data
							that.txData = {
								lastPrice: obj.high24h,
								volume: that.formatNumber(obj.volCcy24h),
								upRate: obj.change24h,
								high: that.fomatFloat(obj.high24h, 2),
								low: obj.low24hth
							}
							that.loading = false
						} else {
							if (Array.isArray(detail.data)) {
								that.rawData = detail.data
								resolve('11')
								console.log(that.rawData.length);
							}
						}
					}
				};

				socket.onclose = function(event) {
					console.error("WebSocket closed", event);
				};

				socket.onerror = function(error) {
					console.error("WebSocket Error: ", error);
				};
			})
		},
		// 返回上一页
		back() {
			uni.navigateBack()
		},
		// 获取24小时交易数据统计
		getTxData() {
			this.txData = this.txData;
		},
		filterArray(arr, prop) { // 过滤数组重复项
			return arr.filter((item, index, array) => {
				// 检查当前元素后面是否还有与该元素属性相同的元素
				const nextItems = array.slice(index + 1);
				const hasDuplicates = nextItems.some(nextItem => nextItem[prop] === item[prop]);

				// 如果后续仍存在具有相同属性的元素，则过滤掉当前元素
				return !hasDuplicates;
			});
		},
		timestampToDate(timestamp) {
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = date.getMonth() + 1; // 月份从0开始，所以要加1
			const day = date.getDate();

			// 使用三元运算符确保月份和日期始终为两位数
			const formattedMonth = month < 10 ? '0' + month : month;
			const formattedDay = day < 10 ? '0' + day : day;

			return year + '-' + formattedMonth + '-' + formattedDay;
		},
		getDial() {
			setTimeout(() => {
				miniChart = echarts.init(document.querySelector('#dial'))
				miniChart.setOption({
					series: [{
						axisLine: {
							show: true,
							lineStyle: {
								color: [
									[1, new echarts.graphic.LinearGradient(0, 0, 1,
										0, [{
												offset: 0.1,
												color: "#4ed6b3"
											},
											{
												offset: 0.5,
												color: "#b2df6b"
											}
										])]
								],
								width: 5
							}
						},
						title: {
							show: true,
							color: '#fff',
							offsetCenter: [0, '60%']
						},
						type: 'gauge',
						radius: '100%',
						max: 100,
						startAngle: 180, //开始角度 左侧角度
						endAngle: 0, //结束角度 右侧
						splitNumber: 5,
						axisTick: {
							show: true, // 隐藏刻度线
						},
						axisLabel: {
							show: true, // 隐藏刻度标签
							color: '#fff',
						},
						pointer: { // 仪表盘指针
							length: '45%',
							width: 3
						},
						//分隔线样式
						splitLine: {
							distance: 0, //分隔线与轴线的距离
							length: 3,
							lineStyle: {
								color: '#228b22',
								width: 1
							}
						},
						itemStyle: {
							color: '#FF5722',
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 2,
							shadowOffsetY: 0
						},
						detail: {
							offsetCenter: [0, '-100px'],
							fontSize: 10,
							lineHeight: 24,
							color: '#fff'
						},
						// 将标签显示在表盘外
						graphic: [{
							type: 'group',
							left: '50%',
							top: '0%',
							children: [{
								type: 'text',
								style: {
									textAlign: 'left',
									text: 'Label',
									fill: '#fff',
									fontSize: 14
								}
							}]
						}],
						data: [{
							value: 26.3,
							name: "买入"
						}]
					}]
				})
			}, 2000)
		},
		// 获取k线数据,生成k线
		getKline() {
			let that = this
			var data = this.rawData.length > 0 && this.rawData.map(function(item) {
				return [+item[1], +item[2], +item[3], +item[4], +item[5] || this.sum(1, 100)];
			})

			var volumes = this.rawData.map(function(item, index) {
				return [index, item[5] || this.sum(1, 100), item[1] > item[2] ? 1 : -1];
			});

			var dataMA5 = this.calculateMA(5, data);
			var dataMA10 = this.calculateMA(10, data);
			var dataMA30 = this.calculateMA(30, data);
			var volumeMA5 = this.calculateMA(5, volumes);
			var volumeMA10 = this.calculateMA(10, volumes);

			var dates = this.rawData.map(function(item) {
				return that.timestampToDate(item[0]);
			})
			myChart.setOption({
				xAxis: [{
						data: dates
					},
					{
						data: dates
					},
					{
						data: dates
					},
				],
				series: [{
						name: '日K',
						data: data
					},
					{
						name: 'MA5',
						data: dataMA5
					},
					{
						name: 'MA10',
						data: dataMA10
					},
					{
						name: 'MA30',
						data: dataMA30
					},
					{
						name: 'Volume',
						data: volumes
					},
					{
						name: 'VolumeMA5',
						data: volumeMA5
					},
					{
						name: 'VolumeMA10',
						data: volumeMA10
					},
				]
			})
		},
		// 列表条数不足补全
		addItem(list, type) {
			// type: 1开头加，2末尾加
			list = list || [];
			let len = 20 - list.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					if (type == 1) {
						list.unshift({})
					} else {
						list.push({})
					}
				}
			}
			return list;
		},
		// 获取深度数据
		getDepth() {
			this.buyList = this.depthList.buyList.length > 0 && this.depthList.buyList.map(item => {
				return {
					price: item[0],
					amount: item[1],
					width: this.sum(1, 100)
				}
			});
			this.sellList = this.depthList.sellList.length > 0 && this.depthList.sellList.map(item => {
				return {
					price: item[0],
					amount: item[1],
					width: this.sum(1, 100)
				}
			});
		},
		// 获取成交记录
		getDealHis() {
			return this.dealHis
		},
		// 获取项目简介信息
		getTokenInfo() {
			this.getDial()
		},

		// 获取指定区间随机数
		sum(m, n) {
			var num = Math.floor(Math.random() * (m - n) + n);
			return num;
		},

		// 切换tab
		switchTab(val) {
			if (this.current == val) return;
			this.current = val;
			period = val
			if (this.current == 7) {
				this.metstatus = true
			} else {
				this.init().then(res => {
					this.getTxData()
					this.getDepth()
					this.draw()
					this.getKline()
				})
			}

		},
		// 切换类目
		switchCategory(val) {
			if (this.category == val) return;
			this.category = val;
			if (this.category == 1) {
				this.getDepth()
			} else if (this.category == 2) {
				this.getDealHis()
			} else {
				this.getTokenInfo()
			}
		},
		// 截取数字字符串 保留precision小数
		formatterNum(value, precision) {
			// console.log(value)
			let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
			return value.toString().match(reg)
		},
		// 计算MA
		calculateMA(dayCount, data) {
			var result = [];
			for (var i = 0, len = data.length; i < len; i++) {
				if (i < dayCount) {
					result.push('-');
					continue;
				}
				var sum = 0;
				for (var j = 0; j < dayCount; j++) {
					sum += data[i - j][1];
				}
				// console.log(sum, dayCount)
				result.push((sum / dayCount).toFixed(2));
			}
			return result;
		},
		// 绘制(配置项)
		draw() {
			let that = this;
			var upColor = '#03ad91';
			var downColor = '#dd345b';
			var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622',
				'#bda29a', '#6e7074',
				'#546570', '#c4ccd3'
			];
			var labelFont = 'bold 12px Sans-serif';
			var option = {
				backgroundColor: '#0d1723',
				title: {
					show: false
				},
				legend: {
					show: true,
					bottom: 'bottom',
					left: 'center'
				},
				visualMap: {
					show: false,
					seriesIndex: 4,
					dimension: 2,
					pieces: [{
						value: 1,
						color: downColor
					}, {
						value: -1,
						color: upColor
					}]
				},
				grid: [{
						top: '10%',
						left: 20,
						right: 20,
						height: '70%',
					},
					{
						top: '80%',
						left: 20,
						right: 20,
						// height: '16%',
						height: '5%',
					},
					{
						top: '90%',
						left: 20,
						right: 20,
						// height: '16%',
						height: '5%',
					}
				],
				axisPointer: { //坐标轴指示器配置项
					link: {
						xAxisIndex: 'all'
					},
					label: {
						backgroundColor: '#0d1723',
						color: '#fff',
						borderColor: 'rgb(99, 117, 139)',
						borderWidth: 1,
						borderRadius: 2,
						fontSize: 10
					}
				},
				xAxis: [{
						type: 'category', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
						data: [], //类目数据，在类目轴（type: 'category'）中有效。
						scale: true,
						boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
						axisLine: {
							show: false
						}, //坐标轴轴线相关设置
						axisTick: {
							show: false
						}, //坐标轴刻度相关设置。
						axisLabel: {
							show: false,
						}, //坐标轴刻度标签的相关设置。
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
						min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
						max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
						axisPointer: {
							label: {
								margin: 200
							}
						},
					}, {
						type: 'category',
						gridIndex: 1, //x 轴所在的 grid 的索引，默认位于第一个 grid。
						data: [], //类目数据，在类目轴（type: 'category'）中有效。
						scale: true,
						boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
						axisLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255,1)',
								width: 1
							}
						}, //坐标轴轴线相关设置
						axisTick: {
							show: false
						}, //坐标轴刻度相关设置。
						axisLabel: { //坐标轴刻度标签的相关设置。
							show: true,
							margin: 6,
							fontSize: 10,
							color: 'rgba(99, 117, 139, 1.0)',
							formatter: function(value) {
								return echarts.format.formatTime('MM-dd', value);
							}
						},
						splitNumber: 20,
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
						min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
						max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
						// axisPointer: { show: true, type: 'none', label: { show: false }},
					},
					{
						type: 'category',
						gridIndex: 1, //x 轴所在的 grid 的索引，默认位于第一个 grid。
						data: [], //类目数据，在类目轴（type: 'category'）中有效。
						scale: true,
						boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
						axisLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255,1)',
								width: 1
							}
						}, //坐标轴轴线相关设置
						axisTick: {
							show: false
						}, //坐标轴刻度相关设置。
						axisLabel: { //坐标轴刻度标签的相关设置。
							show: true,
							margin: 6,
							fontSize: 10,
							color: 'rgba(99, 117, 139, 1.0)',
							formatter: function(value) {
								return echarts.format.formatTime('MM-dd', value);
							}
						},
						splitNumber: 20,
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
						min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
						max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
						// axisPointer: { show: true, type: 'none', label: { show: false }},
					}
				],
				yAxis: [{
						type: 'value', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
						position: 'right', //y 轴的位置。'left','right'
						scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。(在设置 min 和 max 之后该配置项无效。)
						axisLine: {
							show: true
						}, //坐标轴轴线相关设置。
						axisTick: {
							show: true,
							inside: true
						}, //坐标轴刻度相关设置。
						axisLabel: { //坐标轴刻度标签的相关设置。
							show: true,
							color: 'rgba(99, 117, 139, 1.0)',
							inside: true,
							fontSize: 10,
							formatter: function(value) {
								return Number(value).toFixed(2)
							}
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
					}, {
						type: 'value',
						position: 'right',
						scale: true,
						gridIndex: 1,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false
						},
						splitLine: {
							show: false
						}
					},
					{
						type: 'value',
						position: 'right',
						scale: true,
						gridIndex: 1,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false
						},
						splitLine: {
							show: false
						}
					},
				],

				animation: false, //是否开启动画。
				color: colorList,
				tooltip: {
					show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
					trigger: 'axis', //触发类型。item,axis,none
					formatter(params) {
						let tooltip = '';
						let time = '',
							open = 0,
							high = 0,
							low = 0,
							close = 0,
							amount = 0;
						for (var i = 0; i < params.length; i++) {
							if (params[i].seriesName === '日K') {
								time = params[i].name;
								open = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[
									1], 2)) : 0;
								close = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[
									2], 2)) : 0;
								low = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[
									3], 2)) : 0;
								high = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[
									4], 2)) : 0;
								amount = params[i].data.length > 1 ? Number(that.formatterNum(params[i]
									.data[5], 2)) : 0;
								// console.log(time,open,close,low,high,amount)
								tooltip = '<div class="charts-tooltip">' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + '时间' +
									'</div><div class="ctr-value">' + time + '</div></div>' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + '开' +
									'</div><div class="ctr-value">' + open + '</div></div>' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + '高' +
									'</div><div class="ctr-value">' + high + '</div></div>' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + '低' +
									'</div><div class="ctr-value">' + low + '</div></div>' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + '收' +
									'</div><div class="ctr-value">' + close + '</div></div>' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + '数量' +
									'</div><div class="ctr-value">' + amount + '</div></div></div>';
							}
							if (params[i].seriesName === 'MA5') {
								that.MA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i]
									.data, 2)) : 0
							}
							if (params[i].seriesName === 'MA10') {
								that.MA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i]
									.data, 2)) : 0
							}
							if (params[i].seriesName === 'MA30') {
								that.MA30 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i]
									.data, 2)) : 0
							}
							if (params[i].seriesName === 'VolumeMA5') {
								that.volMA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i]
									.data, 2)) : 0
							}
							if (params[i].seriesName === 'VolumeMA10') {
								that.volMA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i]
									.data, 2)) : 0
							}
						}
						return tooltip;
					},
					triggerOn: 'click', //提示框触发的条件 'mousemove','click','mousemove|click','none'
					textStyle: {
						fontSize: 10
					}, //提示框浮层的文本样式
					backgroundColor: 'rgba(30,42,66,0.8);', //提示框浮层的背景颜色。
					borderColor: '#2f3a56', //提示框浮层的边框颜色。
					borderWidth: 2,
					position: function(pos, params, el, elRect, size) { //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
						var obj = {
							top: 20
						};
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
						return obj;
					},
					axisPointer: { //坐标轴指示器配置项。
						label: {
							color: 'rgba(255,255,255,.87)',
							fontSize: 9,
							backgroundColor: '#020204',
							borderColor: "#9c9fa4",
							shadowBlur: 0,
							borderWidth: 0.5,
							padding: [4, 2, 3, 2],
						},
						animation: false,
						type: 'cross',
						lineStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(30, 42, 66, 0.1)' // 0% 处的颜色
								}, {
									offset: 0.7,
									color: 'rgba(30, 42, 66,0.9)' // 100% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(30, 42, 66,0.2)' // 100% 处的颜色
								}]
							},
							width: 10,
							shadowColor: 'rgba(30, 42, 66,0.7)',
							shadowBlur: 0,
							shadowOffsetY: 68,
						}
					}
				},

				dataZoom: [{ //用于区域缩放
					type: 'inside',
					xAxisIndex: [0, 1],
					realtime: false,
					start: 50,
					end: 100,
				}],
				series: [{
						type: 'candlestick',
						name: '日K',
						data: [],
						itemStyle: {
							color: upColor,
							color0: downColor,
							borderColor: upColor,
							borderColor0: downColor
						},
						markPoint: {
							symbol: 'rect',
							symbolSize: [-10, 0.5],
							symbolOffset: [5, 0],
							itemStyle: {
								color: 'rgba(255,255,255,.87)'
							},
							label: {
								color: 'rgba(255,255,255,.87)',
								offset: [10, 0],
								fontSize: 10,
								align: 'left',
								formatter: function(params) {
									return Number(params.value).toFixed(2)
								}
							},
							data: [{
									name: 'max',
									type: 'max',
									valueDim: 'highest'
								},
								{
									name: 'min',
									type: 'min',
									valueDim: 'lowest'
								},
							]
						}
					},
					{
						name: 'MA5',
						type: 'line',
						data: [],
						symbol: 'none', //去除圆点
						smooth: true,
						lineStyle: {
							normal: {
								opacity: 1,
								width: 1,
								color: "#eef4ba"
							}
						},
						z: 5
					},
					{
						name: 'MA10',
						type: 'line',
						data: [],
						symbol: 'none', //去除圆点
						smooth: true,
						lineStyle: {
							normal: {
								opacity: 1,
								width: 1,
								color: '#83c1c5'
							}
						},
						z: 4
					},
					{
						name: 'MA30',
						type: 'line',
						data: [],
						symbol: 'none', //去除圆点
						smooth: true,
						lineStyle: {
							normal: {
								opacity: 1,
								width: 1,
								color: '#b39cd8'
							}
						},
						z: 3
					},
					{
						name: 'Volume',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: []
					},
					{
						name: 'VolumeMA5',
						type: 'line',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: [],
						symbol: 'none', //去除圆点
						smooth: true,
						lineStyle: {
							normal: {
								opacity: 1,
								width: 1,
								color: "#eef4ba"
							}
						},
						z: 5
					},
					{
						name: 'VolumeMA10',
						type: 'line',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: [],
						symbol: 'none', //去除圆点
						smooth: true,
						lineStyle: {
							normal: {
								opacity: 1,
								width: 1,
								color: '#83c1c5'
							}
						},
						z: 4
					}
				]
			};
			myChart.setOption(option);
			// 加载上一页数据
			myChart.on('datazoom', function(params) {
				let num = params.batch[0]['start'];
				if (num == 0) {
					console.log('到最左边了')
				}
			})
			window.addEventListener('resize', () => {
				myChart.resize()
				miniChart.resize()
			})
		}
	}
})