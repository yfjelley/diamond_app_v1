<template>
	<view class="content">
		<uv-cell :title="detail.name" is-link value="查看主页" @click="todetail"></uv-cell>
		<view class="detail-info">
			<view class="title">
				<view class="name">
					{{detail.name}}
				</view>
			</view>
			<view class="tips">
				<text class="red">模拟交易</text>
				<text class="orange">网格交易</text>
				<text class="ccc">手动停止</text>
			</view>
			<view class="info-name">
				<view class="">
					<text>策略号:</text>
					<text>{{detail.id}}</text>
				</view>
				<view class="">
					<text>预估月化</text>
					<text>+{{detail.estimated_monthly_return_rate}}%</text>
				</view>
				<view class="">
					<text>运行时间</text>
					<text>{{detail.running_time[0]}}天{{detail.running_time[1]}}小时{{detail.running_time[2]}}分钟</text>
				</view>
			</view>
			<view class="nav-info">
				<view class="info-item">
					<text>初始资金</text>
					<text>{{detail.initial_funds}}</text>
				</view>
				<view class="info-item">
					<text>期末资金</text>
					<text>{{detail.final_funds}}</text>
				</view>
				<view class="info-item">
					<text>已提取收益</text>
					<text>{{detail.withdrawn_earnings}}</text>
				</view>
				<view class="info-item">
					<text>收益</text>
					<text style="color: #4caf50;font-weight: bold;">{{detail.return}}</text>
				</view>
				<view class="info-item">
					<text>收益率</text>
					<text style="color: #4caf50;font-weight: bold;">{{detail.return_rate}}</text>
				</view>
				<view class="info-item">
					<text>预估月化</text>
					<text style="color: #4caf50;font-weight: bold;">+{{detail.estimated_monthly_return_rate}}%</text>
				</view>
				<view class="info-item">
					<text>交易笔数</text>
					<text>{{detail.trade_count}}</text>
				</view>
				<view class="info-item">
					<text>交易额</text>
					<text>{{detail.trade_volume}}</text>
				</view>
				<view class="info-item">
					<text>最大回撤</text>
					<text>{{detail.max_drawdown}}</text>
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
		<view class="btn-wrap">
			<view class="btn" @click="add">
				复制参数
			</view>
		</view>
	</view>
</template>

<script>
	import {getMinInfo} from '@/api/other/strategy.js'
	export default {
		data() {
			return {
				detail: '',
				index:0,
				list: [{
					name: '策略参数',
					value: 0,
				}, {
					name: '历史操作',
					value: 1,
				}, {
					name: '收益曲线',
					value: 2,
				}],
			}
		},
		methods: {
			pChange(e){
				console.log(e);
			},
			todetail(){
				uni.navigateTo({
					url:`/pages/homedetail/homedetail?detail=${JSON.stringify(this.detail)}`
				})
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
			console.log(this.detail);
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
				width: 375rpx;
				height: 75rpx;
				text{
					font-size: 24rpx;
					padding: 4rpx 8rpx;
					border-radius: 8rpx;
				}
				.red{
					color: red;
					background-color: #ffd9d9;
				}
				.orange{
					color: orange;
					background-color: #fff5d7;
				}
				.ccc{
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
				font-size: 24rpx;
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
			// justify-content: space-between;
			height: 100%;

			.info-item {
				flex: 0 0 30%;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				height: 80rpx;
				font-size: 24rpx;
				margin-bottom: 24rpx;
			}
		}
		.tab{
			padding-right: 175rpx;
			margin-top: 12rpx;
			background-color: #ffffff;
		}
		.btn-wrap {
			position: fixed;
			bottom: 0rpx;
			display: flex;
			align-items: center;
			width: 100%;
			height: 175rpx;
			padding: 8rpx 12rpx;
			box-sizing: border-box;
			background-color: #ffffff;
			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 88rpx;
				color: #ffffff;
				background-color: orange;
				border-radius: 8rpx;
			}
		}
	}
</style>