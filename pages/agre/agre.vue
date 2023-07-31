<template>
	<view>
		<my-nav-bar-search-home :msg-num="value"></my-nav-bar-search-home>
		<view class="content">
			<view class="search-wrap" v-if="issearch">
				<view class="search-box">
					<uni-icons type="search" size="18"></uni-icons>
					<input type="text" placeholder="搜索币种简称">
				</view>
				<uni-icons type="closeempty" size="18" @click="closeTosearch"></uni-icons>
			</view>
			<view class="deallist">
				<view class="head">
					<view style="display: flex;">
						<uni-icons type="search" size="18" @click="openTosearch"></uni-icons>
						<text class="info" style="margin-left: 12px;">24H成交额</text>
					</view>
					<text class="price">价格</text>
					<text>24H涨幅</text>
				</view>
				<view class="list">
					<view class="deal-item" v-for="(item,index) in list" :key="index" @click="todetail(item)">
						<view class="deal-info">
							<view class="deal-info-icon">
								<!-- <image :src="item.icon" mode=""></image> -->
							</view>
							<view class="deal-info-text">
								<view>{{item.famliy}}</view>
								<view class="text-ccc">{{'￥'+formatNumber(item.vol24h)}}</view>
							</view>
						</view>
						<view class="deal-price">
							<view class="text-bold text-red">{{item.bidPrice}}</view>
							<view class="text-ccc">{{'￥'+fomatFloat(item.bidPrice*7.2,2)}}</view>
						</view>
						<view class="deal-type"
							:class="[Math.sign(item.change24h)==1? 'deal-item-rose':'deal-item-fall']">
							{{item.change24h}}%
						</view>
						<view class="deal-icon" @click="setFavorite(item.symbol)">
							<uni-icons v-if='item.isfav' type="heart" size="15" color="orange"></uni-icons>
							<uni-icons v-else type="heart" size="15"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
		<lb-tabbar v-model="active"
		  @change="handleChange">
		  <lb-tabbar-item v-for="item in tabbars"
		    :key="item.name"
		    :name="item.name"
		    :icon="item.icon"
		    icon-prefix="iconfont">
		    {{ item.text }}
		  </lb-tabbar-item>
		</lb-tabbar>
	</view>
</template>

<script>
	import myNavBarSearchHome from "../../components/my-nav-bar/my-nav-bar-search-home";
	import{favorite,getfavorite} from '@/api/other/setting.js'
	export default {
		components: {
			myNavBarSearchHome
		},
		data() {
			return {
				socket: "",
				issearch: false,
				socketStatus: false,
				socketMsgQueue: [],
				title: this.$t('common.home'),
				value: 4,
				temp: [],
				adCurrent: 0,
				adMode: 'round',
				riseList: [],
				favlist:[],
				active: 'market',
				tabbars: [
				  {
				    name: 'market',
				    text: '行情',
				    icon: 'notice',
					path:'/pages/home/index',
				    icon: '/static/tabbar/market.png',
				    iconActive: '/static/tabbar/market-selected.png'
				  },
				  {
				    name: 'trade',
				    text: '交易',
				    icon: 'notice',
					path:'/pages/trade/index',
				    icon: '/static/tabbar/trade.png',
				    iconActive: '/static/tabbar/trade-selected.png'
				  },
				 {
				   name: 'contract',
				   text: '合约',
				   icon: 'notice',
				   path:'/pages/contract/index',
				   icon: '/static/tabbar/contract.png',
				   iconActive: '/static/tabbar/contract-selected.png'
				 },
				 {
				   name: 'wallet',
				   text: '资产',
				   icon: 'notice',
				   path:'/pages/wallet/index',
				   icon: '/static/tabbar/wallet.png',
				   iconActive: '/static/tabbar/wallet-selected-active.png'
				 },
				]
			}
		},
		created() {
			uni.showLoading()
			this.init()
			this.getfavoriteList()
		},
		methods: {
			handleChange(e) {
				switch (e.name) {
					case 'market':
						uni.reLaunch({
							url: '/pages/home/index'
						})
						break;
					case 'trade':
					uni.reLaunch({
						url: '/pages/trade/index'
					})
						break;
					case 'contract':
					uni.reLaunch({
						url: '/pages/contract/index'
					})
						break;
					case 'wallet':
					uni.reLaunch({
						url: '/pages/wallet/index'
					})
						break;
					default:
						break;
				}
			},
			getfavoriteList(){
				getfavorite().then(res=>{
					this.favlist=res.data||[]
				})
			},
			setFavorite(i){
				favorite({"symbol":i.toUpperCase()}).then(res=>{
					if(res.code==200){
						this.temp.forEach((item,index)=>{
							if(item.symbol==i){
								item['isfav']=1
							}
						})
						this.getfavoriteList()
						uni.showToast({
							title:'收藏成功'
						})
					}
				})
			},
			adChange(e) {
				this.adCurrent = e.detail.current;
			},
			getMore() {

			},
			openTosearch() {
				this.issearch = true
			},
			closeTosearch() {
				this.issearch = false
			},
			todetail(item) {
				var obj = {
					text: item.symbol
				}
				uni.navigateTo({
					url: `/pages/BTCDETAIL/BTCDETAIL?detail=${JSON.stringify(obj)}`
				})
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
			init() {
				let that = this
				let arr = []
				uni.showLoading()
				this.socke = uni.connectSocket({
					url: 'ws://8.217.204.77:9000/ws/ticker/',
					// method: 'GET'
				});
				uni.onSocketOpen(function(res) { // 在连接建立后发送一个订阅消息
					that.socketStatus = true

					var subscribeMessage = {
						action: "subscribe",
						subscriptions: [{
							group: 'ticker',
							symbols: ["spot"] // 订阅现货的
						}, ]
					};

					that.sendMessage(JSON.stringify(subscribeMessage))

				});
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
				});

				uni.onSocketMessage(function(res) {
					if (!JSON.parse(res.data).event) {
						arr.push({
							isfav:0,
							...JSON.parse(res.data).data
						})
						that.temp = that.filterArray(arr, 'symbol')
						
						that.temp.forEach(item=>{
							that.favlist.map(i=>{
								if(item.symbol.toUpperCase()==i){
									item.isfav=1
								}
							})
						})
						uni.hideLoading()
					}

				});
			},
			sendMessage(msg) {
				if (this.socketStatus) {
					uni.sendSocketMessage({
						data: msg
					})
				} else {
					this.socketMsgQueue.push(msg);
				}
			},
			filterArray(arr, prop) {
				return arr.filter((item, index, array) => {
					// 检查当前元素后面是否还有与该元素属性相同的元素
					const nextItems = array.slice(index + 1);
					const hasDuplicates = nextItems.some(nextItem => nextItem[prop] === item[prop]);

					// 如果后续仍存在具有相同属性的元素，则过滤掉当前元素
					return !hasDuplicates;
				});
			}
		},
		watch: {
			temp: {
				handler(newName, oldName) {
					// if (newName.length >= 13) {
					// 	this.temp=this.temp.slice(-10)
					// }
				},
				immediate: false
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
		},
		beforeDestroy() {
			this.socke.close()
		},
		computed: {
			list() {
				return this.temp.sort((a, b) => {
					const lowerA = a.symbol.toLowerCase();
					const lowerB = b.symbol.toLowerCase();
					if (lowerA < lowerB) {
						return -1;
					}
					if (lowerA > lowerB) {
						return 1;
					}
					return 0;
				});
			}
		},
	}
</script>

<style lang="scss">
	.search-wrap {
		margin-top: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 88rpx;
		padding: 8rpx 12rpx;
		box-sizing: border-box;

		.search-box {
			display: flex;
			align-items: center;
			padding: 0 12rpx;
			width: 92%;
			height: 100%;
			border-radius: 48rpx;
			box-sizing: border-box;
			background-color: #f3f3f3;

			input {
				padding: 0 12rpx;
				width: 100%;
				font-size: 25rpx;
			}
		}
	}

	.content {
		background-color: #FFFFFF;
	}

	.card-head {
		padding: 0 12px;
		margin-top: 12px;

		.uni-noticebar {
			border-radius: 4px;
			border: 1px solid orange;
			background-color: #feffef !important;
		}
	}

	.text-bold {
		font-weight: bold;
		font-size: 14px;
	}

	.text-red {
		color: red;
		font-weight: bold;
		font-size: 13px;
	}

	.text-ccc {
		color: #a7a7a7;
	}


	.deallist {
		width: 100%;
		padding-bottom: 48rpx;
		height: 100%;

		.head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 88rpx;
			font-size: 12rpx;
			padding: 0 12px;
			box-sizing: border-box;
			color: #a7a7a7;
			background-color: #ffffff;
		}

		.list {
			display: flex;
			flex-direction: column;
			align-items: center;

			.deal-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 55px;
				padding: 0 12px;
				font-size: 24rpx;
				box-sizing: border-box;
				background-color: #ffffff;

				.deal-ran {
					color: red;
					width: 12px;
					height: 12px;
					padding: 4px;
					color: #ffffff;
					text-align: center;
					line-height: 12px;
					background-color: coral;
				}

				.deal-info {
					display: flex;
					align-items: center;
					width: 255rpx;

					.deal-info-icon {
						width: 24px;
						height: 24px;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.deal-info-text {
						margin-left: 12px;
					}
				}

				.deal-price {
					width: 100rpx;
					margin-left: -20rpx;
					text-align: center;
				}

				.deal-type {
					padding: 4px 8px;
					display: block;
					width: 88rpx;
					margin-right: -80rpx;
					text-align: center;
					color: #ffffff;
				}

				.deal-item-rose {
					background-color: #15b515;
				}

				.deal-item-fall {
					background-color: red;
				}
			}
		}
	}
</style>