<template>
	<view>
		<view v-if="curselectId==1">
			<view class="info-card">
				<view class="info" @click="selectCoin('left')">
					<view class="left">
						<uni-icons type="contact" size="30"></uni-icons>
						<text>{{curCoin}}</text>
						<uni-icons type="bars" size="24"></uni-icons>
					</view>
					<view class="right">
						<text class="num">{{coin_bidPrice}}</text>
						<uni-icons type="more" size="30"></uni-icons>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="card1 card-item">
					<view class="title">
						策略名称
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.name">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						API
					</view>
					<uni-data-select v-model="apimode" :localdata="range" @change="change"></uni-data-select>
				</view>
				<view class="card1 card-item">
					<view class="title">
						定投总资金
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.total_investment">
						<text>USDT</text>
					</view>
				</view>

				<view class="card1 card-item">
					<view class="title">
						定投次数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.times">
						<text>次</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						持仓止盈率
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.position_profit_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						总仓止盈率
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.total_profit_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="steps">
					<view class="title">
						投资步骤
					</view>
					<view class="tip">
						<text>目标价格</text>
						<text>投入资金比例</text>
					</view>
					<view class="inp-wrap" v-for="(item,index) in form.steps" :key="index">
						<text class="num">{{item.step_number}}</text>
						<view class="inp-box">
							<input type="text" v-model="item.target_price">
							<input type="text" v-model="item.investment_ratio">
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="info-card">
				<view class="info" @click="selectCoin('left')">
					<view class="left">
						<uni-icons type="contact" size="30"></uni-icons>
						<text>{{curCoin}}</text>
						<uni-icons type="bars" size="24"></uni-icons>
					</view>
					<view class="right">
						<text class="num">{{coin_bidPrice}}</text>
						<uni-icons type="more" size="30"></uni-icons>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="card1 card-item">
					<view class="title">
						策略名称
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.name">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						API
					</view>
					<uni-data-select v-model="apimode" :localdata="range" @change="change"></uni-data-select>
				</view>
				<view class="card1 card-item">
					<view class="title">
						定投总资金
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.total_investment">
						<text>USDT</text>
					</view>
				</view>

				<view class="card1 card-item">
					<view class="title">
						定投次数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.times">
						<text>次</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						持仓止盈率
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.position_profit_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						总仓止盈率
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.total_profit_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="steps">
					<view class="title">
						投资步骤
					</view>
					<view class="tip">
						<text>目标价格</text>
						<text>投入资金比例</text>
					</view>
					<view class="inp-wrap" v-for="(item,index) in form.steps" :key="index">
						<text class="num">{{item.step_number}}</text>
						<view class="inp-box">
							<input type="text" v-model="item.target_price">
							<input type="text" v-model="item.investment_ratio">
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="content">
					<view class="title"><text>合约交易对</text></view>
					<view class="search">
						<view class="pair-list-head">
							<my-input class="pair-list-head-input" size="mini" placeholder="搜索" v-model="searchvalue">
								<template slot="prefix">
									<uni-icons class="pair-list-head-search" type="search" size="20" color="#E1E8F5" />
								</template>
							</my-input>
						</view>
					</view>
					<view class="list">
						<view class="item" v-for="(item,index) in symbolList" :key="index" @click="changeSymbol(item)">
							<view class="item-info">
								<text>{{item.ticker.famliy}}</text>
								<text class="text">{{item.ticker.type=='swap'? '永续':''}}</text>
							</view>
							<view>{{item.ticker.bidPrice}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		createSpot,
		getSpotSmart,
		getSymbolList,
		getApimode,
		checkSpot
	} from '@/api/other/strategy.js'
	import myInput from "../../components/my-input/input"
	import uniSearchBar from '@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSearchBar,
			myInput
		},
		data() {
			return {
				curCoin: 'BTN/USDT',
				curCoinId: '',
				type: '',
				coin_bidPrice: '',
				searchvalue: '',
				type: 'center',
				curselectId: '1',
				cecurselectId: '1',
				ggcurselectId: '1',
				symbolList: [],
				apimode: 0,
				gridmode: 0,
				direction: 'long',

				form: {
					name: '', // 名称
					total_investment: 0,
					times: 0,
					total_profit_ratio: 0,
					api_mode: '1',
					position_profit_ratio: 0,
					symbol: '',
					steps: [{
							step_number: 1,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 2,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 3,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 4,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 5,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 6,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 7,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 8,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 9,
							target_price: 0,
							investment_ratio: 0
						},
						{
							step_number: 10,
							target_price: 0,
							investment_ratio: 0
						}
					]
				},
				steps: [{
						step_number: 1,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 2,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 3,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 4,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 5,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 6,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 7,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 8,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 9,
						target_price: 0,
						investment_ratio: 0
					},
					{
						step_number: 10,
						target_price: 0,
						investment_ratio: 0
					}
				],
				steps: 10,
				range: [],
				selectlist: [{
						id: '1',
						text: '智能策略',
					},
					{
						id: '2',
						text: '自定义策略',
					},
				],
				detail:''
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
			this.checkInfo(this.detail.id)
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
			this.getSymbolinfo()
			this.getApiMode()

		},
		methods: {
			search() {},
			input() {},
			cancel() {},
			clear() {},
			async checkInfo(id){
				let res=await checkSpot(id)
				this.form=res.data
			},
			async getSpotSmartInfo(symbol) {
				let res = await getSpotSmart({
					symbol: symbol
				})
				if(res.data.results.length==0){
					uni.showToast({
						title:'智能参数为空，请选择其他币对',
						icon:'none'
					})
				}else{
					this.form = res.data.results[0]
				}
			},
			change(e) {
				this.form.api_mode = e
			},
			changeSymbol(item) {
				this.form.symbol = item.symbol
				this.getSpotSmartInfo(item.symbol)
				this.coin_bidPrice = item.ticker.bidPrice
				this.curCoin = item.ticker.famliy
				this.$refs.popup.close()
			},
			async getSymbolinfo() {
				let res = await getSymbolList({
					suffix: 'usdt'
				})
				this.symbolList = res.data
			},
			async getApiMode() {
				let res = await getApimode()
				this.range = res.data.results.map(item => {
					return {
						value: item.id,
						text: item.remark
					}
				})
			},
			selectCoin(type) {
				this.type = type
				this.$refs.popup.open(type)
			},
			// 添加策略
			async add() {
				let res = await createSpot(this.form)
				if (res.code == 201) {
					uni.showToast({
						title: '添加成功'
					})
					this.form = {
						...this.form,
						name: '', // 名称
						total_investment: 0,
						times: 0,
						total_profit_ratio: 0,
						api_mode: '1',
						position_profit_ratio: 0,
						symbol: '',
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon:'none'
					})
				}
			},
			selecttype(item) {
				this.curselectId = item.id
			},
			ceselecttype(item) {
				this.direction = item.value
				this.cecurselectId = item.id
			},
			ggselecttype(item) {
				this.ggcurselectId = item.id
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup-content {
		display: flex;
		flex-direction: column;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		height: 100vh;
		width: 200px;
	}

	.content {
		.title {
			height: 75rpx;
			line-height: 75rpx;
			font-size: 30rpx;
			font-weight: bold;
		}

		.pair-list-head-title {
			font-size: 20px;
			color: #E1E8F5;
		}

		.pair-list-head-input {
			border-radius: 4px;
		}

		.pair-list-head-search {
			margin-left: 5px;
		}

		.list {
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 75rpx;
				line-height: 75rpx;
				font-size: 24rpx;

				.item-info {
					flex: 0 0 71%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.text {
						margin-left: 12rpx;
					}
				}
			}
		}
	}

	.info-card {
		margin-top: 24rpx;
		width: 100%;
		height: 99rpx;
		padding: 0 12rpx;
		box-sizing: border-box;

		.info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			padding: 0 18rpx;
			border-radius: 8rpx;
			box-sizing: border-box;
			box-shadow: 1px 1px 5px #ccc;

			.left {
				flex: 0 0 50%;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}

			.right {
				flex: 0 0 30%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.num {
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	}

	.fixed-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 112rpx;
		padding: 12rpx 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 9999;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
			color: #ffffff;
			background-color: orange;
		}
	}

	.card {
		margin-top: 24rpx;
		padding: 48rpx 24rpx;
		padding-bottom: 100rpx;
		overflow-y: scroll;
		padding-bottom: 175rpx;

		.card-item {
			margin-top: 12rpx;
			margin-bottom: 12rpx;

			.celselect-card {
				margin-top: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				height: 49px;
				background-color: #ffffff;
				padding: 2px 8rpx;
				box-sizing: border-box;

				.select-item {
					flex: 0 0 30%;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					border: 1px solid #9da5a5;
					border-radius: 8rpx;

					image {
						width: 35px;
						height: 35px;
					}
				}

				.select-item-one {
					flex: 0 0 22%;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					border: 1px solid #9da5a5;
					border-radius: 8rpx;

					image {
						width: 35px;
						height: 35px;
					}
				}

				.select-item-active {
					color: orange;
					border: 1px solid orange;
					background-color: #feffef;
				}
			}
		}

		.title {}

		.input-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12rpx;
			width: 100%;
			height: 88rpx;
			padding: 0 24rpx;
			border-radius: 8rpx;
			box-sizing: border-box;
			border: 1px solid #d0cccc;

			.input {
				flex: 0 0 80%;
				width: 100%;
				color: #000;
				font-weight: bold;
			}
		}

		.tip {
			padding: 12rpx 0;
		}
	}

	.select-card {
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 49px;
		background-color: #ffffff;
		padding: 2px 24rpx;
		box-sizing: border-box;

		.select-item {
			flex: 0 0 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: #9da5a5;
			background-color: #ebe9e9;
			border-radius: 8rpx;

			image {
				width: 35px;
				height: 35px;
			}
		}

		.select-item-active {
			color: #ffffff;
			background-color: orange;
		}
	}

	.steps {
		.title {
			height: 75rpx;
			line-height: 75rpx;
			font-size: 30rpx;
			font-weight: bold;
		}

		.tip {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 75rpx;
			line-height: 75rpx;

			text {
				text-align: center;
				flex: 0 0 48%;
			}
		}

		.inp-wrap {
			display: flex;
			align-items: center;

			.num {
				width: 75rpx;
				height: 100%;
				text-align: center;
			}

			.inp-box {
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 88rpx;
				margin-top: 12rpx;

				input {
					flex: 0 0 45%;
					height: 100%;
					border-radius: 12rpx;
					border: 1px solid #ccc;
					padding: 0 24rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>