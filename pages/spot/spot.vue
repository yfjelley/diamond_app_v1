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
							<!-- <view class="deal-info-icon"> -->
								<!-- <image :src="item.icon" mode=""></image> -->
							<!-- </view> -->
							<view class="deal-info-text">
								<view>{{item.famliy}} 永续</view>
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
						<view class="deal-icon" @click="setFavorite(item)">
							<uni-icons v-if='item.isfav== 1' type="heart" size="15" color="orange"></uni-icons>
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
	import{favorite,getfavorite , deletefavorite} from '@/api/other/setting.js'
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
				value: 3,
				temp: [],
				adMode: 'round',
				riseList: [],
				favlist:[],
				active: 'market',
				tabbars: [{
						name: 'market',
						text: '行情',
						icon: 'notice',
						path: '/pages/home/index',
						icon: '/static/tabbar/market.png',
						iconActive: '/static/tabbar/market-selected.png'
					},
					{
						name: 'trade',
						text: '量化',
						icon: 'notice',
						path: '/pages/tactics/tactics',
						icon: '/static/tabbar/trade.png',
						iconActive: '/static/tabbar/trade-selected.png'
					},
					{
						name: 'contract',
						text: '教程',
						icon: 'notice',
						path: '/pages/tuto/tuto',
						icon: '/static/tabbar/contract.png',
						iconActive: '/static/tabbar/contract-selected.png'
					},
					{
						name: 'wallet',
						text: '资产',
						icon: 'notice',
						path: '/pages/wallet/index',
						icon: '/static/tabbar/wallet.png',
						iconActive: '/static/tabbar/wallet-selected-active.png'
					},
				]
			}
		},
		created() {
			uni.showLoading()
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
			this.init()
			this.getfavoriteList()
		},
		onHide() {
				let subscribeMessage = {
					action: "unsubscribe",
					subscriptions: [{
							group: 'ticker',
							symbols: ["swap"] // 订阅永续合约的
						}
					]
				};
			this.$store.state.ws.send(subscribeMessage);
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
					if(res.code == 200){
					  this.favlist= res.data
					}
				})
			},
			setFavorite(i){
				if(i.isfav == 1){
					deletefavorite({"symbol":i.symbol.toUpperCase()}).then(res=>{
						if(res.code==200){
							console.log(this.temp);
							this.temp.forEach((item,index)=>{
								if(item.symbol==i){
									item['isfav']= 0
								}
							})
							console.log(this.temp);
							this.getfavoriteList()
							uni.showToast({
								title:'取消收藏'
							})
						}
					})	
				}else{
					favorite({"symbol":i.symbol.toUpperCase()}).then(res=>{
						if(res.code==200){
							console.log(this.temp);
							this.temp.forEach((item,index)=>{
								if(item.symbol==i){
									item['isfav']=1
								}
							})
							console.log(this.temp);
							this.getfavoriteList()
							uni.showToast({
								title:'收藏成功'
							})
						}
					})
				}

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
			init() {
				uni.showLoading()
				let subscribeMessage = {
					action: "subscribe",
					subscriptions: [{
							group: 'ticker',
							symbols: ["swap"] // 订阅永续合约的
						}
					]
				};
			   this.$store.state.ws.send(subscribeMessage);
			   this.getSocketData();
			},
			getSocketData() {
			  let arr = []
			  this.$store.state.ws.on("message", (res) => {
				// console.log(JSON.parse(res.data))
					if (!JSON.parse(res.data).event) {
						uni.hideLoading()
						arr.push({
							...JSON.parse(res.data).data
						})
						this.temp = this.filterArray(arr, 'symbol')
						// console.log(this.temp);
						this.temp.forEach(item=>{
							this.favlist.forEach(i=>{
								if(item.symbol.toUpperCase()==i){
									item.isfav=1
								}
							})
						})
					}
			  });
			},
			filterArray(arr, prop) {
				return arr.filter((item, index, array) => {
					// 检查当前元素后面是否还有与该元素属性相同的元素
					const nextItems = array.slice(index + 1);
					const hasDuplicates = nextItems.some(nextItem => nextItem[prop] === item[prop] && nextItem.type === 'swap');

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
			},
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
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
			font-size: 12px;
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