<template>
	<view class="content">
		<view class="detail-info">
			<view class="title">
				<view class="name">
					{{detail.name}}
				</view>
			</view>
			<view class="tips">
				<text class="red">模拟交易</text>
				<text class="orange">网格交易</text>
				<text class="ccc">{{detail.status=='STARTED'? '执行中':'手动停止'}}</text>
			</view>
			<view class="info-name">
				<view class="">
					<text>策略号:</text>
					<text>2023080100000</text>
				</view>
				<view class="">
					<text>预估月化</text>
					<text>+0.00%</text>
				</view>
				<view class="">
					<text>运行时间</text>
					<text style="margin-left: 6px;">{{detail.running_time[0]}}天{{detail.running_time[1]}}小时{{detail.running_time[2]}}分钟</text>
				</view>
			</view>
			<view class="nav-info">
				<view class="info-item">
					<text>初始资金</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>期末资金</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>已用资金</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>收益</text>
					<text style="font-weight: bold;" :class="[Math.sign(detail.return)==1? 'tip1':'tip2']">{{detail.return}}</text>
				</view>
				<view class="info-item">
					<text>收益率</text>
					<text style="font-weight: bold;" :class="[Math.sign(detail.return_rate)==1? 'tip1':'tip2']">{{Math.sign(detail.return_rate)==1?'+':''}}{{detail.return_rate}}%</text>
				</view>
				<view class="info-item">
					<text>预估月化</text>
					<text style="font-weight: bold;" :class="[Math.sign(detail.estimated_monthly_return_rate)==1? 'tip1':'tip2']">{{Math.sign(detail.estimated_monthly_return_rate)==1?'+':''}}{{detail.estimated_monthly_return_rate}}%</text>
				</view>
				<view class="info-item">
					<text>已提取收益</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>交易额</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>交易笔数</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>多单套单</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>空单套单</text>
					<text>50.00</text>
				</view>
				<view class="info-item">
					<text>最大回撤</text>
					<text>50.00</text>
				</view>
			</view>
		</view>
		<view class="tab">
			<zb-tab :activeStyle="{
			    fontWeight: 'bold',
				color:'orange',
			    transform: 'scale(1)'
			    }" lineColor="orange" :data="list" v-model="index" @change="pChange"></zb-tab>
		</view>
		<view class="list">
			<view v-if="index==0">
				<kevy-empty  :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
					text="暂无消息~">
				</kevy-empty>
			</view>
			<view v-if="index==1">
				<view v-if="info.notdeallist.length">
					<view class="list-item" v-for="(item,index) in info.notdeallist" :key="index">
						<view class="title">{{item.display_symbol}}</view>
						<view class="title">
							<text class="tip" :class="[item.direction.indexOf('出')!==-1? 'one':'two']">{{item.direction}}</text>
							<text class="time">{{item.fillTime_date}}</text>
						</view>
						<view class="nav-info">
							<view class="info-item">
								<text>委托量(BTC)</text>
								<text class="bold">{{item.amount||0}}</text>
							</view>
							<view class="info-item">
								<text>触发价格(USDT)</text>
								<text class="bold">{{item.triggerPrice||0}}</text>
							</view>
							<view class="info-item">
								<text>委托价格(USDT)</text>
								<text class="bold">{{item.price||0}}</text>
							</view>
						</view>
					</view>
				</view>
				<kevy-empty v-else  :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
					text="暂无委托订单~">
				</kevy-empty>
			</view>
			<view v-if="index==2">
				<view v-if="info.granlist.length">
					<view class="list-item" v-for="(item,index) in info.granlist" :key="index">
						<view class="title">{{item.display_symbol}}
						<text style="margin-left: 6px;font-weight: bold;" :class="[Math.sign(item.upl_ratio)==1? 'tip1':'tip2']">{{Math.sign(item.upl_ratio)==1?'+':''}}{{item.upl_ratio}}%</text>
						</view>
						<view class="title">
							<text class="tip side">{{item.side}}{{item.leverage}}</text>
							<!-- <text class="time"></text> -->
						</view>
						<view class="nav-info">
							<view class="info-item">
								<text>持仓均价(USDT)</text>
								<text class="bold">{{item.entryPrice||0}}</text>
							</view>
							<view class="info-item">
								<text>收益(USDT)</text>
								<text class="bold" :class="[Math.sign(item.unrealizedPnl)==1? 'tip1':'tip2']">{{Math.sign(item.unrealizedPnl)==1?'+':''}}{{Number(item.unrealizedPnl).toFixed(2)||0}}</text>
							</view>
							<view class="info-item">
								<text>持仓量(BTC)</text>
								<text class="bold">{{item.contracts||0}}</text>
							</view>
							<view class="info-item">
								<text>强平价格(USDT)</text>
								<text class="bold">{{Number(item.liquidationPrice).toFixed(2)||0}}</text>
							</view>
							<view class="info-item">
								<text>保证金(USDT)</text>
								<text class="bold">{{Number(item.maintenanceMargin).toFixed(2)||0}}</text>
							</view>
							<view class="info-item">
								<text>可平量(BTC)</text>
								<text class="bold">{{item.contracts||0}}</text>
							</view>
						</view>
					</view>
				</view>
				<kevy-empty v-else  :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
					text="暂无持仓订单~">
				</kevy-empty>
			</view>
			<view v-if="index==3">
				<view v-if="info.deallist.length">
					<view class="list-item" v-for="(item,index) in info.deallist" :key="index">
						<view class="title">{{item.display_symbol}}</view>
						<view class="title">
							<text class="tip" :class="[item.direction.indexOf('出')!==-1? 'one':'two']">{{item.direction}}</text>
							<text class="time">{{item.fillTime_date}}</text>
						</view>
						<view class="nav-info">
							<view class="info-item">
								<text>委托量(BTC)</text>
								<text class="bold">{{item.fillSz||0}}</text>
							</view>
							<view class="info-item">
								<text>委托价格(USDT)</text>
								<text class="bold">{{item.fillPx||0}}</text>
							</view>
							<view class="info-item">
								<text>参考收益(USDT)</text>
								<text class="bold">{{item.fillPnl||0}}</text>
							</view>
							<view class="info-item">
								<text>成交量(BTC)</text>
								<text class="bold">{{item.fillSz||0}}</text>
							</view>
							<view class="info-item">
								<text>成交均价(USDT)</text>
								<text class="bold">{{item.fillPx ||0}}</text>
							</view>
							<view class="info-item">
								<text>手续费(USDT)</text>
								<text class="bold">{{item.fee||0}}</text>
							</view>
						</view>
					</view>
				</view>
				<kevy-empty v-else  :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
					text="暂无成交订单~">
				</kevy-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getgran,
		getdeal,
		getnotdeal
	} from '@/api/other/strategy.js'
	export default {
		data() {
			return {
				detail: '',
				index: 0,
				type: 0,
				list: [{
					name: '消息',
					value: 0,
				}, {
					name: '委托',
					value: 1,
				}, {
					name: '持仓',
					value: 2,
				}, {
					name: '订单',
					value: 3,
				}],
				info:{
					msglist:[],
					granlist:[],
					deallist:[],
					notdeallist:[]
				}
			}
		},
		methods: {
			async getGranInfo() {
				let res = await getgran({
					symbol: this.type == 0 ? 'BTC-USDT-SWAP' : 'BTC-USDT',
					strategy_id: this.type
				})
				uni.hideLoading()
				this.info.granlist=res.data
			},
			async getDealInfo() {
				let res = await getdeal({
					symbol: this.type == 0 ? 'BTC-USDT-SWAP' : 'BTC-USDT-SWAP'
				})
				uni.hideLoading()
				this.info.deallist=res.data
			},
			async getNotDealInfo() {
				let res = await getnotdeal({
					symbol: this.type == 0 ? 'BTC-USDT-SWAP' : 'BTC-USDT',
					strategy_id: this.type
				})
				uni.hideLoading()
				this.info.notdeallist=res.data
			},
			pChange(e) {
				switch (e.value) {
					case 1:
						this.getNotDealInfo()
						break;
					case 2:
						this.getGranInfo()
						break;
					case 3:
						this.getDealInfo()
						break;
					default:
						break;
				}
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
			console.log(this.detail);
			this.type = JSON.parse(options.type)
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f3f3f3;

		.detail-info {
			padding: 24rpx;
			box-sizing: border-box;
			background-color: #ffffff;

			.tips {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 400rpx;
				height: 75rpx;

				text {
					font-size: 24rpx;
					padding: 4rpx 8rpx;
					border-radius: 8rpx;
				}

				.red {
					color: red;
					background-color: #ffd9d9;
				}

				.orange {
					color: orange;
					background-color: #fff5d7;
				}

				.ccc {
					color: #ccc;
					background-color: #f3f3f3;
				}
			}

			.info-name {
				display: flex;
				flex-direction: column;
				height: 135rpx;
				margin-bottom: 24rpx;
				line-height: 35rpx;

				view {
					margin-top: 12rpx;
				}
			}
		}

		.nav-info {
			margin-top: 24rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			font-size: 28rpx;
			.info-item {
				flex: 0 0 30%;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				height: 80rpx;
				margin-bottom: 24rpx;
			}
		}

		.tab {
			padding-right: 175rpx;
			margin-top: 12rpx;
			background-color: #ffffff;
		}

		.bold {
			font-weight: bold;
		}

		.list {
			.list-item {
				padding: 24rpx;
				background-color: #fff;
				border-bottom: 1px solid #f3f3f3;

				.title {
					padding: 8rpx 0;

					.tip {
						font-weight: bold;
						padding: 8rpx 12rpx;
						font-size: 24rpx;
					}
					.side{
						color: #4caf50;
						background-color: #d5fbd6;
					}

					.time {
						margin-left: 12rpx;
						color: #ccc;
					}
				}
			}
		}
		.one{
			color: red;
			background-color: #ffd9d9;
		}
		.two{
			color: #4caf50;
			background-color: #d5fbd6;
		}
		.tip1{
			color: #4caf50;
		}
		.tip2{
			color: red;
		}
	}
</style>