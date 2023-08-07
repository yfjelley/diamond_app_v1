<template>
	<view>
		<my-nav-bar-search-home :msg-num="value"></my-nav-bar-search-home>
		<view class="content">
			<view class="card-head">
				<uni-notice-bar  :speed="30" @getmore="getMore" :showGetMore="true" backgroundColor="#FFFFFF" color="#000000"
					moreColor="#000000" :showIcon="true" :scrollable="true" :text="noticeText"></uni-notice-bar>
			</view>
			<view class="banner">
				<uni-swiper-dot :info="adList" :current="adCurrent" field="content" :mode="adMode"
					:dotsStyles="{backgroundColor: '#CCCCCC', selectedBackgroundColor: '#FFFFFF'}">
					<swiper class="swiper-box" @change="adChange" autoplay>
						<swiper-item v-for="(item ,index) in adList" :key="index">
							<view class="swiper-item">
								<image :src="item"></image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="nav-card">
				<view class="nav-item" v-for="(item,index) in navlist" :key="index" @click="NAVTo(item)">
					<image :src="item.icon"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view class="tab-card">
				<view class="tab-item" v-for="(item,index) in tablist" :key="index" @click="TABTo(item)">
					<view class="left side">
						<text  style="font-size: 12px;">{{item.text}}</text>
						<text style="font-size: 12px;">{{item.type}}</text>
					</view>
					<view class="right side">
						<text class="text-bold">{{item.num}}</text>
						<text class="text-red">{{item.rate}}</text>
					</view>
				</view>
			</view>
			<view class="select-card">
				<view class="select-item" :class="[curselectId==item.id? 'select-item-active':'']"
					v-for="(item,index) in selectlist" :key="index" @click="selecttype(item)">
					<image :src="item.icon" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view class="deallist">
				<view class="head">
					<text class="ran">#</text>
					<text class="info">24H成交额</text>
					<text class="price">价格</text>
					<text>24H涨幅</text>
				</view>
				<view class="list">
					<view class="deal-item" v-for="(item,index) in list" :key="index" @click="todetail(item)">
						<view class="deal-ran">{{index+1}}</view>
						<view class="deal-info">
							<view class="deal-info-icon">
								<!-- <image :src="item.icon" mode=""></image> -->
							</view>
							<view class="deal-info-text">
								<view>{{item.famliy}}
									<text class="tip">永续</text>
								</view>
								<view class="text-ccc">{{'￥'+formatNumber(item.vol24h)}}</view>
							</view>
						</view>
						<view class="deal-price">
							<view class="text-bold text-red">{{item.bidPrice}}</view>
							<view class="text-ccc">{{'￥'+fomatFloat(item.bidPrice*7.2,2)}}</view>
						</view>
						<view class="deal-type" :class="[curselectId=='1'? 'deal-item-rose':'deal-item-fall']">
							{{item.change24h}}%
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myNavBarSearchHome from "../../components/my-nav-bar/my-nav-bar-search-home";
	import {getAppinfo} from '@/api/other/setting.js'
	export default {
		components: {
			myNavBarSearchHome
		},
		data() {
			return {
				socket: "",
				socketStatus: false,
				socketMsgQueue: [],
				curselectId: '1',
				title: this.$t('common.home'),
				value: 1,
				temp: [],
				adCurrent: 0,
				adMode: 'round',
				btc_usdt_price: '',
				eth_usdt_price: '',
				riseList: [],
				adList: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				noticeList: [
					
				],
				navlist: [{
						id: '1',
						text: '充值',
						path: '/pages/rechar/rechar',
						icon: 'https://wp.lhtools.live/view.php/d495de6cda014288ebb53c83f85b4995.png'
					},
					{
						id: '2',
						text: '策略排行',
						path: '/pages/tactics/tactics',
						icon:'https://wp.lhtools.live/view.php/3859bce8d9bc5d5523e39893836db8e1.png'
					},
					{
						id: '3',
						text: '教程',
						path: '/pages/tuto/tuto',
						icon: 'https://wp.lhtools.live/view.php/89c7901b29846c0de9ef6579c09376ba.png'
					},
					{
						id: '4',
						text: '邀请好友',
						path:'/pages/mine/invited',
						icon: 'https://wp.lhtools.live/view.php/f4792154e5abc746b12053f7bad73849.png'
					},
				],
				tablist: [{
						id: '1',
						text: 'BTC/USDT 永续',
						type: '24小时涨幅',
						num: '',
						path: '/pages/btcdetall/btcdetall',
						rate: '-0.10%'
					},
					{
						id: '2',
						text: 'ETH/USDT 永续',
						type: '24小时涨幅',
						num: '',
						path: '/pages/btcdetall/btcdetall',
						rate: '-0.63%'
					},
				],
				selectlist: [{
						id: '1',
						text: '涨幅榜',
						icon: 'https://wp.lhtools.live/view.php/ad7984123af84964581e745a6854ded5.png'
					},
					{
						id: '2',
						text: '跌幅榜',
						icon: 'https://wp.lhtools.live/view.php/2248682ed91846456b9ff7c5570523ef.png'
					},
				]
			}
		},
		created() {
			uni.showLoading()
			this.init()
			this.getMessage()
		},
		methods: {
			getMessage(){
				getAppinfo().then(res=>{
					const msg=res.data.results
					this.noticeList.push(msg[0].title)
					this.noticeList.push(msg[0].content)
				})
			},
			adChange(e) {
				this.adCurrent = e.detail.current;
			},
			getMore() {

			},
			selecttype(item) {
				this.curselectId = item.id
			},
			NAVTo(item) {
				uni.navigateTo({
					url: `${item.path}?detail=${JSON.stringify(item)}`
				})
			},
			TABTo(item) {
				uni.navigateTo({
					url: `${item.path}?detail=${JSON.stringify(item)}`
				})
			},
			todetail(item){
				var obj={
					text:item.symbol
				}
				uni.navigateTo({
					url: `/pages/btcdetall/btcdetall?detail=${JSON.stringify(obj)}`
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
			getSocketData(){
			 const that = this
			 let arr = []
			  this.$store.state.ws.on("message", (res) => {
					if (!JSON.parse(res.data).event) {
						uni.hideLoading()
						if (JSON.parse(res.data).data.famliy == 'BTC/USDT') {
							that.$set(that.tablist, 0, {
								...that.tablist[0],
								rate: JSON.parse(res.data).data.change24h + '%',
								num: that.fomatFloat(JSON.parse(res.data).data.bidPrice, 2)
							})
							that.btc_usdt_price=JSON.parse(res.data)
						}
						if (JSON.parse(res.data).data.famliy == 'ETH/USDT') {
							that.$set(that.tablist, 1, {
								...that.tablist[1],
								rate: JSON.parse(res.data).data.change24h + '%',
								num: that.fomatFloat(JSON.parse(res.data).data.bidPrice, 2)
							})
							that.eth_usdt_price=JSON.parse(res.data).data
						}
						arr.push({
							...JSON.parse(res.data).data
						})
						that.temp=that.filterArray(arr,'famliy')
					}
			  });
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
		computed: {
			noticeText() {
				return this.noticeList.join(" ")
			},
			list(){
				if (this.curselectId == '1') {
					return this.temp.sort((a, b) => b.change24h - a.change24h).slice(0, 10)
				} else {
					return this.temp.sort((a, b) => a.change24h - b.change24h).slice(0, 10)
				}
			}
		},
	}
</script>

<style lang="scss">
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
	.text-ccc{
		color: #a7a7a7;
		}

	.banner {
		background-color: #FFFFFF;
		padding: 15px 0 20px;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		padding: 0 22px;
		box-sizing: border-box;

		image {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			overflow: hidden;
		}
	}

	.card {
		background-color: #FFFFFF;

		.card-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			border-bottom: 1px solid #292E39;
			padding: 5px 0;
			border-radius-topleft: 5px;

			.new-box {
				font-size: 13px;
				padding: 0 8px;
				text-align: left;
				flex: 1;
				color: #000000;
				overflow: hidden;

				.new-title {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.card-body {
			min-height: 10px;
		}

	}

	.nav-card {
		display: flex;
		padding: 12px 0;
		width: 100%;
		align-items: center;
		justify-content: space-evenly;
		height: 49px;

		.nav-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
            font-size: 24rpx;
			image {
				width: 60rpx;
				height: 60rpx;
			}

			text {
				// color: #ffffff;
			}
		}
	}

	.tab-card {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 79px;
		margin: 12px 0;
		padding: 0 12px;
		box-sizing: border-box;

		.tab-item {
			flex: 0 0 48%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 100%;
			padding: 0 12px;
			font-size: 24rpx;
			border-radius: 8px;
			box-sizing: border-box;
			background-color: #f6f6f6;

			.side {
				display: flex;
				justify-content: space-between;
				width: 100%;
			}
		}
	}

	.select-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 49px;
		background-color: #ffffff;
		padding: 2px 0;

		.select-item {
			flex: 0 0 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			font-size: 28rpx;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.select-item-active {
			border-bottom: 2px solid orange;
		}
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
			.info{
				height: 100%;
				line-height: 88rpx;
				margin-left: -48rpx;
			}
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
					margin-left: -24rpx;
					width: 335rpx;
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
						.tip{
							margin-left: 12rpx;
						}
					}
				}

				.deal-price {
					width: 100rpx;
					margin-right: 48rpx;
					text-align: center;
				}

				.deal-type {
					padding: 4px 8px;
					display: block;
					width: 88rpx;
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