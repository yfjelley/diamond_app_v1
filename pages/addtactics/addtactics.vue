<template>
	<view>
		<view class="select-card">
			<view class="select-item" :class="[curselectId==item.id? 'select-item-active':'']"
				v-for="(item,index) in selectlist" :key="index" @click="selecttype(item)">
				<text>{{item.text}}</text>
			</view>
		</view>
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
						交易方向
					</view>
					<view class="celselect-card">
						<view class="select-item" :class="[cecurselectId==item.id? 'select-item-active':'']"
							v-for="(item,index) in chillist" :key="index" @click="ceselecttype(item)">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
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
						总投入资金
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.total_investment">
						<text>USDT</text>
					</view>
				</view>

				<view class="card1 card-item">
					<view class="title">
						杠杆倍数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.lever">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单单笔下单金额
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.long_order_amount">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单单笔下单金额
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.short_order_amount">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单利润间距
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.long_profit_margin">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						API
					</view>
					<uni-data-select v-model="form.api_mode" :localdata="range" @change="change"></uni-data-select>
				</view>
				<view class="card1 card-item">
					<view class="title">
						网格模式
					</view>
					<uni-data-select v-model="form.grid_mode" :localdata="gridrange"
						@change="gridchange"></uni-data-select>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单利润间距
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.short_profit_margin">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单网格间距
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.long_grid_interval">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单网格间距
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.short_grid_interval">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						止盈比例
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.take_profit_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						止损比例
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.stop_loss_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单最大套单数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.max_long_orders">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单最大套单数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.max_short_orders">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间上轨
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.upper_bound">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间中轨
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.middle_bound">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间下轨
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.lower_bound">
					</view>
				</view>

				<view class="card1 card-item">
					<view class="title">
						多单对冲开单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单补单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_fill_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单对冲平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_close_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单对冲单止损价格
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_stop_loss_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单补单后整体平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_post_close_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单对冲开单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单补单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_fill_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单对冲平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_close_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单对冲单止损价格
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_stop_loss_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单补单后整体平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_post_close_price">
						<text>USDT</text>
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
						交易方向
					</view>
					<view class="celselect-card">
						<view class="select-item" :class="[cecurselectId==item.id? 'select-item-active':'']"
							v-for="(item,index) in chillist" :key="index" @click="ceselecttype(item)">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
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
						总投入资金
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.total_investment">
						<text>USDT</text>
					</view>
				</view>

				<view class="card1 card-item">
					<view class="title">
						杠杆倍数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.lever">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单单笔下单金额
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.long_order_amount">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单单笔下单金额
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_order_amount">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单利润间距
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.long_profit_margin">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						API
					</view>
					<uni-data-select v-model="form.api_mode" :localdata="range" @change="change"></uni-data-select>
				</view>
				<view class="card1 card-item">
					<view class="title">
						网格模式
					</view>
					<uni-data-select v-model="form.grid_mode" :localdata="gridrange"
						@change="gridchange"></uni-data-select>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单利润间距
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_profit_margin">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单网格间距
					</view>
					<view class="input-box">
						<input class="input" type="text"  v-model="form.long_grid_interval">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单网格间距
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_grid_interval">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						止盈比例
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.take_profit_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						止损比例
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.stop_loss_ratio">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单最大套单数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.max_long_orders">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单最大套单数
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.max_short_orders">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间上轨
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.upper_bound">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间中轨
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.middle_bound">
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间下轨
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.lower_bound">
					</view>
				</view>

				<view class="card1 card-item">
					<view class="title">
						多单对冲开单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单补单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_fill_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单对冲平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_close_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单对冲单止损价格
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_stop_loss_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						多单补单后整体平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.long_hedg_post_close_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单对冲开单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单补单价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_fill_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单对冲平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_close_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单对冲单止损价格
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_stop_loss_price">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						空单补单后整体平仓价
					</view>
					<view class="input-box">
						<input class="input" type="text" v-model="form.short_hedg_post_close_price">
						<text>USDT</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-btn">
			<view class="btn" @click="add">
				启动
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
		createGrid,
		getSymbolList,
		getApimode,
		getGridSmart
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
				curCoin: 'BTC/USDT 永续',
				curCoinId: '',
				type: '',
				coin_bidPrice: '',
				searchvalue: '',
				type: 'center',
				curselectId: '1',
				cecurselectId: '1',
				ggcurselectId: '1',
				symbolList: [],
				templist:[],
				apimode: 0,
				gridmode: 0,
				direction: 'long',
				range: [],
				form: {
					name: '',
					preset_open_price: '', // 启动网格的触发价格
					direction: '',
					grid_mode: '',
					total_investment: '',
					lever: '',
					long_order_amount: '',
					short_order_amount: "",
					long_profit_margin: "",
					short_profit_margin: "",
					long_grid_interval: "",
					short_grid_interval: "",
					take_profit_ratio: "",
					stop_loss_ratio: "",
					max_long_orders: '',
					max_short_orders: '',
					upper_bound: '',
					middle_bound: '',
					lower_bound: '',
					long_hedg_price: '',
					long_hedg_fill_price: '',
					long_hedg_close_price: '',
					long_stop_loss_price: '',
					long_hedg_post_close_price: '',
					short_hedg_price: '',
					short_hedg_fill_price: '',
					short_hedg_close_price: '',
					short_stop_loss_price: '',
					short_hedg_post_close_price: '',
					api_mode: '',
					symbol: ''
				},
				gridrange: [{
						text: '等比',
						value: 'ratio'
					},
					{
						text: '等差',
						value: 'diff'
					}
				],
				selectlist: [{
						id: '1',
						text: '智能策略',
					},
					{
						id: '2',
						text: '自定义策略',
					},
				],
				chillist: [{
						id: '1',
						text: '做多',
						value: 'long'
					},
					{
						id: '2',
						text: '做空',
						value: 'short'
					}, {
						id: '3',
						text: '震荡',
						value: 'both'
					}
				]
			}
		},
		onLoad(options) {
			this.type = JSON.parse(options.type)
			uni.setNavigationBarTitle({
				title: this.type == 0 ? '添加网格策略' : '添加定投策略'
			})
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
			this.getSymbolinfo()
			this.getApiMode()
			this.getGridSmartInfo('BTC-USDT-SWAP')
		},
		methods: {
			search() {},
			input() {},
			cancel() {},
			clear() {},
			async getGridSmartInfo(symbol) {
				let res = await getGridSmart({
					symbol: symbol
				})
				if (res.data.results.length == 0) {
					uni.showToast({
						title: '智能参数为空，请选择其他币对',
						icon: 'none'
					})
					this.form={}
				} else {
					this.form = res.data.results[0]
				}
			},
			gridchange(e) {
				this.gridmode = e
			},
			change(e) {
				this.apimode = e
			},
			changeSymbol(item) {
				this.curCoinId = item.id
				this.getGridSmartInfo(item.symbol)
				this.coin_bidPrice = item.ticker.bidPrice
				this.curCoin = item.ticker.famliy
				this.$refs.popup.close()
			},
			async getSymbolinfo() {
				let res = await getSymbolList({
					suffix: 'swap'
				})
				this.symbolList = res.data
				this.templist=res.data
				let arr=this.symbolList.filter(item=>item.ticker.famliy=='BTC/USDT')
				this.coin_bidPrice=arr[0].ticker.bidPrice
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
				let res = await createGrid(this.form)
				if (res.code == 201) {
					uni.showToast({
						title: '添加成功'
					})
					this.form = {}
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
				this.form.direction = item.value
				this.cecurselectId = item.id
			},
			ggselecttype(item) {
				this.ggcurselectId = item.id
			}
		},
		watch:{
			searchvalue:{
				handler(n,o){
					if(n==''){
						this.symbolList=this.templist
					}else{
						this.symbolList=this.symbolList.filter(item=>item.ticker.famliy.indexOf(n)!==-1)
					}
				}
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
		padding: 0 24rpx;
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
			font-size: 24rpx;
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
		font-size: 24rpx !important;
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
			font-size: 24rpx;
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
</style>